import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Check if user exists using admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: users, error: userError } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('email', email.trim());

    if (userError || !users || users.length === 0) {
      // Return success anyway for security
      return NextResponse.json({ message: "If account exists, email sent." });
    }

    // 2. Generate recovery link
    const origin = req.nextUrl.origin;
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email.trim(),
      options: {
        redirectTo: `${origin}/update-password`
      }
    });

    if (linkError || !linkData.properties?.action_link) {
      throw new Error(linkError?.message || "Failed to generate link");
    }

    const resetLink = linkData.properties.action_link;

    // 3. Send email via EmailJS REST API
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    // If variables aren't set, we log it and simulate success.
    if (!serviceId || !templateId || !publicKey || serviceId.includes('your_')) {
      console.warn("EmailJS credentials not set. Reset link generated but not sent:", resetLink);
      return NextResponse.json({ message: "If account exists, email sent. (Simulation: Check console)" });
    }

    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey, // EmailJS uses 'user_id' for the public key in their REST API
        accessToken: privateKey, // Required if EmailJS account is in strict mode
        template_params: {
          to_email: email.trim(),
          reset_link: resetLink,
        },
      }),
    });

    if (!emailJsResponse.ok) {
      const errText = await emailJsResponse.text();
      throw new Error(`EmailJS Error: ${errText}`);
    }

    return NextResponse.json({ message: "If account exists, email sent." });

  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 });
  }
}
