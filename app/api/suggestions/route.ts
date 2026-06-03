import { NextResponse } from "next/server";
import { submitSuggestion } from "@/services/waitlist.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await submitSuggestion({
      waitlistId: body.waitlistId,
      email: body.email,
      suggestion: body.suggestion,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
