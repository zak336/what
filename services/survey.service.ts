import { appendToSheet } from "@/lib/googlesheets";

export async function submitPricingSurvey(data: {
  waitlistId: string;
  email: string;
  willingToPay: string;
  preferredPrice: string;
  maximumPrice: string;
  paymentModel: string;
  valuableFeatures: string[];
  worthPayingFor: string;
}) {
  try {
    // Store pricing survey data
    const pricingValues = [
      data.waitlistId,
      data.email,
      data.willingToPay,
      data.preferredPrice,
      data.maximumPrice,
      data.paymentModel,
    ];

    await appendToSheet("PricingSurvey", pricingValues);

    // Store subscription feedback separately
    if (data.worthPayingFor) {
      const feedbackValues = [data.waitlistId, data.email, data.worthPayingFor];
      await appendToSheet("SubscriptionFeedback", feedbackValues);
    }

    // Store valuable features (if needed)
    if (data.valuableFeatures && data.valuableFeatures.length > 0) {
      const featurePromises = data.valuableFeatures.map((feature) => {
        const values = [data.waitlistId, data.email, feature];
        return appendToSheet("ValuableFeatures", values);
      });
      await Promise.all(featurePromises);
    }

    trackEvent("pricing_survey_completed", { waitlistId: data.waitlistId });

    return {
      success: true,
      message: "Survey submitted successfully",
    };
  } catch (error) {
    console.error("Pricing survey submission failed:", error);
    throw new Error("Failed to submit survey");
  }
}

function trackEvent(eventName: string, data?: any) {
  console.log(`[Analytics] ${eventName}`, data);
}
