import { NextResponse } from "next/server";
import { submitFeatureVotes } from "@/services/waitlist.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await submitFeatureVotes({
      waitlistId: body.waitlistId,
      email: body.email,
      features: body.features,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
