import { NextResponse } from "next/server";
import { submitVerification } from "@/services/verification.service";
import { validateFile } from "@/lib/validation";

export const maxDuration = 60; // 60 seconds timeout
export const dynamic = 'force-dynamic';

// Vercel body size limit configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Vercel limit is 4.5MB, keeping safe margin
    },
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const waitlistId = formData.get("waitlistId") as string;
    const email = formData.get("email") as string;
    const college = formData.get("college") as string;
    const documentType = formData.get("documentType") as string;
    const file = formData.get("file") as File;

    console.log("Verification request:", { waitlistId, email, college, documentType, fileName: file?.name });

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (!waitlistId || !email) {
      return NextResponse.json(
        { success: false, message: "Missing waitlist ID or email" },
        { status: 400 }
      );
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    console.log("Uploading file:", file.name, file.size, file.type);

    const result = await submitVerification({
      waitlistId,
      email,
      college,
      documentType,
      file,
    });

    console.log("Upload result:", result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Verification API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload verification" },
      { status: 500 }
    );
  }
}
