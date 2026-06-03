import { NextResponse } from "next/server";
import { submitPricingSurvey } from "@/services/survey.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await submitPricingSurvey({
      waitlistId: body.waitlistId,
      email: body.email,
      willingToPay: body.willingToPay,
      preferredPrice: body.pricePoint,
      maximumPrice: body.maxAmount,
      paymentModel: body.paymentStyle,
      valuableFeatures: body.valuableFeatures || [],
      worthPayingFor: body.worthPayingFor,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Survey API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit survey" },
      { status: 500 }
    );
  }
}
