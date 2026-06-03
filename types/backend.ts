// Backend Type Definitions for Common Room Waitlist

export interface WaitlistEntry {
  timestamp: string;
  waitlistId: string;
  name: string;
  email: string;
  college: string;
  department: string;
  year: string;
  userType: "gec_raipur" | "external_college";
}

export interface FeatureVote {
  waitlistId: string;
  email: string;
  feature: string;
}

export interface Suggestion {
  waitlistId: string;
  email: string;
  suggestion: string;
}

export interface ContributorInterest {
  waitlistId: string;
  email: string;
  role: 
    | "Writer"
    | "Photographer"
    | "Developer"
    | "Designer"
    | "Startup Founder"
    | "Club Representative"
    | "Community Moderator"
    | "Alumni Contributor"
    | "Just a Reader";
}

export interface VerificationSubmission {
  waitlistId: string;
  email: string;
  college: string;
  documentType: "Student ID Card" | "Admission Letter" | "Fee Receipt" | "Bonafide Certificate";
  googleDriveLink: string;
}

export interface PricingSurveySubmission {
  waitlistId: string;
  email: string;
  willingToPay: "yes" | "no" | "maybe";
  preferredPrice: string;
  maximumPrice: string;
  paymentModel: "monthly" | "yearly" | "both";
}

export interface SubscriptionFeedback {
  waitlistId: string;
  email: string;
  response: string;
}

export interface WaitlistResponse {
  success: boolean;
  waitlistId: string;
  position: number;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
