import { appendToSheet } from "@/lib/googlesheets";

export async function submitPricingSurvey(data: {
  waitlistId: string;
  email: string;
  joinReason: string;
  valuableFeatures: string[];
  howHeard: string;
  joinCommunity: string;
  preferredPlatform: string;
  preserveForFuture: string;
  worthPayingFor: string;
}) {
  try {
    // Store onboarding survey data
    const surveyValues = [
      data.waitlistId,
      data.email,
      data.joinReason,
      data.valuableFeatures.join(", "),
      data.howHeard,
      data.joinCommunity,
      data.preferredPlatform,
      data.preserveForFuture,
      data.worthPayingFor,
      new Date().toISOString(),
    ];

    await appendToSheet("OnboardingSurvey", surveyValues);

    // Store valuable features separately for analysis
    if (data.valuableFeatures && data.valuableFeatures.length > 0) {
      const featurePromises = data.valuableFeatures.map((feature) => {
        const values = [data.waitlistId, data.email, feature, new Date().toISOString()];
        return appendToSheet("ValuableFeatures", values);
      });
      await Promise.all(featurePromises);
    }

    trackEvent("onboarding_survey_completed", { waitlistId: data.waitlistId });

    return {
      success: true,
      message: "Survey submitted successfully",
    };
  } catch (error) {
    console.error("Survey submission failed:", error);
    throw new Error("Failed to submit survey");
  }
}

function trackEvent(eventName: string, data?: any) {
  console.log(`[Analytics] ${eventName}`, data);
}
