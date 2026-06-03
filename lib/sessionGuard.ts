// SessionStorage-based route protection for onboarding flow

export const SESSION_KEYS = {
  WAITLIST_ID: "waitlistId",
  EMAIL: "email",
  COLLEGE: "college",
  WAITLIST_COMPLETED: "waitlistCompleted",
  SURVEY_ALLOWED: "surveyAllowed",
  SURVEY_COMPLETED: "surveyCompleted",
} as const;

// Store waitlist data after successful submission
export function storeWaitlistData(data: {
  waitlistId: string;
  email: string;
  college: string;
}) {
  if (typeof window === "undefined") return;
  
  sessionStorage.setItem(SESSION_KEYS.WAITLIST_ID, data.waitlistId);
  sessionStorage.setItem(SESSION_KEYS.EMAIL, data.email);
  sessionStorage.setItem(SESSION_KEYS.COLLEGE, data.college);
  sessionStorage.setItem(SESSION_KEYS.WAITLIST_COMPLETED, "true");
}

// Mark survey as accessible
export function allowSurveyAccess() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEYS.SURVEY_ALLOWED, "true");
}

// Mark survey as completed
export function markSurveyCompleted() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEYS.SURVEY_COMPLETED, "true");
}

// Get stored waitlist data
export function getWaitlistData() {
  if (typeof window === "undefined") return null;
  
  return {
    waitlistId: sessionStorage.getItem(SESSION_KEYS.WAITLIST_ID),
    email: sessionStorage.getItem(SESSION_KEYS.EMAIL),
    college: sessionStorage.getItem(SESSION_KEYS.COLLEGE),
  };
}

// Check access permissions
export function canAccessSuccess(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEYS.WAITLIST_COMPLETED) === "true";
}

export function canAccessVerify(): boolean {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem(SESSION_KEYS.WAITLIST_ID);
}

export function canAccessSurvey(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEYS.SURVEY_ALLOWED) === "true";
}

export function canAccessThankYou(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEYS.SURVEY_COMPLETED) === "true";
}

// Cleanup after completion (keep user data)
export function cleanupOnboardingFlags() {
  if (typeof window === "undefined") return;
  
  sessionStorage.removeItem(SESSION_KEYS.WAITLIST_COMPLETED);
  sessionStorage.removeItem(SESSION_KEYS.SURVEY_ALLOWED);
  sessionStorage.removeItem(SESSION_KEYS.SURVEY_COMPLETED);
}
