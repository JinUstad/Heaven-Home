import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";

// Initialize Cashfree SDK instance
const cashfree = new Cashfree(
  process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID || "",
  process.env.CASHFREE_SECRET_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, customerId, customerName, customerEmail, customerPhone } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const orderId = `order_${Date.now()}`;

    const request = {
      order_amount: parseFloat(amount),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId || `cust_${Date.now()}`,
        customer_name: customerName || "Customer",
        customer_email: customerEmail || "customer@example.com",
        customer_phone: customerPhone || "9999999999",
      },
      order_meta: {
        return_url: `${req.nextUrl.origin}/cart?order_id={order_id}`,
      },
    };

    // Use the instance method
    const response = await cashfree.PGCreateOrder(request);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Cashfree Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.response?.data || error.message || error.toString() },
      { status: 500 }
    );
  }
}
