import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ReceiptItem {
  id?: string | number;
  name: string;
  category?: string;
  price: number;
  quantity: number;
}

export interface ReceiptData {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  pincode: string;
  items: ReceiptItem[];
  totalAmount: number;
  paymentMode?: string;
  paymentId?: string;
}

export function generateAndDownloadReceipt(data: ReceiptData) {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 1. Top Header Brand Banner
    doc.setFillColor(18, 24, 38); // Dark luxury navy/slate
    doc.rect(0, 0, pageWidth, 38, "F");

    // Company Name
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("HEAVEN HOME", 14, 18);

    // Brand Tagline
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.text("Luxury Home Living & Premium Decor", 14, 25);
    doc.text("www.heavenhome.com  |  support@heavenhome.com", 14, 30);

    // INVOICE / RECEIPT Title on right
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("PAYMENT RECEIPT", pageWidth - 14, 18, { align: "right" });

    // Paid Badge
    doc.setFillColor(16, 185, 129); // Emerald green
    doc.roundedRect(pageWidth - 44, 23, 30, 8, 2, 2, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("PAID", pageWidth - 29, 28.5, { align: "center" });

    // 2. Info Cards (Customer Details & Order Details)
    const startY = 46;

    // Left Column: Customer & Delivery Details
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, startY, 86, 44, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("CUSTOMER & DELIVERY DETAILS", 18, startY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(data.customerName || "Customer", 18, startY + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Phone: ${data.customerPhone || "N/A"}`, 18, startY + 18);
    if (data.customerEmail) {
      doc.text(`Email: ${data.customerEmail}`, 18, startY + 23);
    }

    // Split Address across lines if long
    const addressText = `${data.deliveryAddress || ""}${data.pincode ? ` - ${data.pincode}` : ""}`;
    const splitAddress = doc.splitTextToSize(addressText, 78);
    doc.text(splitAddress, 18, startY + (data.customerEmail ? 28 : 24));

    // Right Column: Order & Payment Info
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(pageWidth - 100, startY, 86, 44, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("ORDER & TRANSACTION INFO", pageWidth - 96, startY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    doc.text("Order ID:", pageWidth - 96, startY + 13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(data.orderId || `ORD_${Date.now()}`, pageWidth - 18, startY + 13, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Date & Time:", pageWidth - 96, startY + 19);
    doc.text(data.orderDate || new Date().toLocaleString(), pageWidth - 18, startY + 19, { align: "right" });

    doc.text("Payment Mode:", pageWidth - 96, startY + 25);
    doc.setFont("helvetica", "bold");
    doc.text(data.paymentMode || "Cashfree Online (UPI/Card/NetBanking)", pageWidth - 18, startY + 25, { align: "right" });

    if (data.paymentId) {
      doc.setFont("helvetica", "normal");
      doc.text("Payment Ref:", pageWidth - 96, startY + 31);
      doc.text(String(data.paymentId), pageWidth - 18, startY + 31, { align: "right" });
    }

    doc.setFont("helvetica", "normal");
    doc.text("Shipping Mode:", pageWidth - 96, startY + (data.paymentId ? 37 : 31));
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 185, 129);
    doc.text("Free Doorstep Delivery", pageWidth - 18, startY + (data.paymentId ? 37 : 31), { align: "right" });

    // 3. Items Table using autoTable
    const tableBody = data.items.map((item, index) => [
      index + 1,
      item.name || "Item",
      item.category || "Home Decor",
      `Rs. ${Number(item.price).toFixed(2)}`,
      item.quantity,
      `Rs. ${(Number(item.price) * Number(item.quantity)).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: startY + 49,
      head: [["#", "Item Description", "Category", "Price / Unit", "Qty", "Total Amount"]],
      body: tableBody,
      theme: "striped",
      headStyles: {
        fillColor: [18, 24, 38],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "left"
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 70 },
        2: { cellWidth: 32 },
        3: { cellWidth: 26, halign: "right" },
        4: { cellWidth: 15, halign: "center" },
        5: { cellWidth: 29, halign: "right", fontStyle: "bold" }
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3.5,
        textColor: [30, 41, 59],
        lineColor: [241, 245, 249],
        lineWidth: 0.2
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      margin: { left: 14, right: 14 }
    });

    // 4. Totals Summary Calculation
    let finalY = (doc as any).lastAutoTable?.finalY || 160;
    if (finalY + 50 > pageHeight) {
      doc.addPage();
      finalY = 20;
    }

    const summaryBoxX = pageWidth - 90;
    const summaryBoxWidth = 76;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(summaryBoxX, finalY + 6, summaryBoxWidth, 34, 2, 2, "FD");

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Subtotal:", summaryBoxX + 6, finalY + 13);
    doc.text(`Rs. ${Number(data.totalAmount).toFixed(2)}`, pageWidth - 20, finalY + 13, { align: "right" });

    doc.text("Shipping & Handling:", summaryBoxX + 6, finalY + 19);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 185, 129);
    doc.text("FREE", pageWidth - 20, finalY + 19, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.line(summaryBoxX + 6, finalY + 22, pageWidth - 20, finalY + 22);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("Total Paid:", summaryBoxX + 6, finalY + 31);
    doc.setTextColor(18, 24, 38);
    doc.text(`Rs. ${Number(data.totalAmount).toFixed(2)}`, pageWidth - 20, finalY + 31, { align: "right" });

    // 5. Terms & Customer Support Notice (Left side of totals)
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(71, 85, 105);
    doc.text("Important Notice & Support", 14, finalY + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text("• This is an electronically generated receipt for your records.", 14, finalY + 18);
    doc.text("• Keep this receipt for warranty and delivery reference.", 14, finalY + 23);
    doc.text("• For order support, contact support@heavenhome.com with your Order ID.", 14, finalY + 28);

    // 6. Bottom Footer
    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 18, pageWidth - 14, pageHeight - 18);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text("Thank you for shopping with Heaven Home! We hope you love your new pieces.", pageWidth / 2, pageHeight - 12, { align: "center" });
    doc.text("Heaven Home Living Pvt Ltd • All Rights Reserved", pageWidth / 2, pageHeight - 7, { align: "center" });

    // 7. Save & Auto-Download PDF
    const cleanOrderId = (data.orderId || "receipt").replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`HeavenHome_Receipt_${cleanOrderId}.pdf`);
  } catch (error) {
    console.error("Error generating receipt PDF:", error);
  }
}
