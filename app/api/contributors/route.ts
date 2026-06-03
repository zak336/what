import { NextResponse } from "next/server";
import { submitContributorInterest } from "@/services/waitlist.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await submitContributorInterest({
      waitlistId: body.waitlistId,
      email: body.email,
      roles: body.roles,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
