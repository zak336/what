import { NextResponse } from "next/server";
import { submitWaitlist } from "@/services/waitlist.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await submitWaitlist({
      name: body.fullName,
      email: body.email,
      college: body.collegeName,
      department: body.department,
      year: body.yearOfStudy,
      collegeType: body.collegeType,
    });

    return NextResponse.json({
      ...result,
      email: body.email,
    });
  } catch (error: any) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Stats endpoint - implement with Google Sheets query",
  });
}
