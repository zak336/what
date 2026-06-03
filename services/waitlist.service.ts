import { appendToSheet, updateCell } from "@/lib/googlesheets";
import { WaitlistResponse } from "@/types/backend";

export async function submitWaitlist(data: {
  name: string;
  email: string;
  college: string;
  department: string;
  year: string;
  collegeType: "gec" | "other";
}): Promise<WaitlistResponse> {
  try {
    const timestamp = new Date().toISOString();
    const userType = data.collegeType === "gec" ? "gec_raipur" : "external_college";

    const values = [
      timestamp,
      "", // Placeholder for waitlistId, will be set after we get position
      data.name,
      data.email,
      data.college,
      data.department,
      data.year,
      userType,
    ];

    const response = await appendToSheet("Waitlist", values);
    
    if (!response.success) {
      throw new Error(response.error || "Failed to append to sheet");
    }

    const position = response.position || 1;
    const waitlistId = `WL-${String(position).padStart(3, "0")}`;

    // Update the waitlistId in column B (column 2) of the newly created row
    // Row number is position + 1 (to account for header row)
    const rowNumber = position + 1;
    await updateCell("Waitlist", rowNumber, 2, waitlistId);

    trackEvent("waitlist_submitted", { waitlistId, college: data.college });

    return {
      success: true,
      waitlistId,
      position,
      message: "Successfully joined waitlist!",
    };
  } catch (error) {
    console.error("Waitlist submission failed:", error);
    throw new Error("Failed to join waitlist");
  }
}

export async function submitFeatureVotes(data: {
  waitlistId: string;
  email: string;
  features: string[];
}) {
  try {
    // Create one row per feature
    const promises = data.features.map((feature) => {
      const values = [data.waitlistId, data.email, feature];
      return appendToSheet("FeatureVotes", values);
    });

    await Promise.all(promises);

    trackEvent("feature_votes_submitted", {
      waitlistId: data.waitlistId,
      count: data.features.length,
    });

    return { success: true };
  } catch (error) {
    console.error("Feature votes submission failed:", error);
    throw new Error("Failed to submit feature votes");
  }
}

export async function submitSuggestion(data: {
  waitlistId: string;
  email: string;
  suggestion: string;
}) {
  try {
    const values = [data.waitlistId, data.email, data.suggestion];
    await appendToSheet("Suggestions", values);

    trackEvent("suggestion_submitted", { waitlistId: data.waitlistId });

    return { success: true };
  } catch (error) {
    console.error("Suggestion submission failed:", error);
    throw new Error("Failed to submit suggestion");
  }
}

export async function submitContributorInterest(data: {
  waitlistId: string;
  email: string;
  roles: string[];
}) {
  try {
    const promises = data.roles.map((role) => {
      const values = [data.waitlistId, data.email, role];
      return appendToSheet("Contributors", values);
    });

    await Promise.all(promises);

    trackEvent("contributor_interest_submitted", {
      waitlistId: data.waitlistId,
      roles: data.roles,
    });

    return { success: true };
  } catch (error) {
    console.error("Contributor interest submission failed:", error);
    throw new Error("Failed to submit contributor interest");
  }
}

// Analytics placeholder
function trackEvent(eventName: string, data?: any) {
  console.log(`[Analytics] ${eventName}`, data);
  // TODO: Integrate with analytics provider
}
