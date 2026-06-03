import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googlesheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const values = [
      new Date().toISOString(),
      body.name,
      body.email,
      body.college || "N/A",
      body.subject,
      body.message,
    ];

    await appendToSheet("ContactMessages", values);

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
