import { appendToSheet, uploadToDrive } from "@/lib/googlesheets";

export async function submitVerification(data: {
  waitlistId: string;
  email: string;
  college: string;
  documentType: string;
  file: File;
}) {
  try {
    console.log("Converting file to base64...");
    
    // Convert File to ArrayBuffer then to base64
    const arrayBuffer = await data.file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    
    console.log("Base64 conversion complete, length:", base64Data.length);

    const folderName = getFolderNameByCollege(data.college);
    console.log("Target folder:", folderName);

    const uploadPayload = {
      fileName: `${data.waitlistId}_${data.documentType}_${Date.now()}.${getFileExtension(data.file.name)}`,
      mimeType: data.file.type,
      base64Data,
      folderId: folderName,
    };

    console.log("Uploading to Drive:", uploadPayload.fileName, uploadPayload.mimeType);

    const uploadResponse = await uploadToDrive(uploadPayload);
    console.log("Drive upload response:", uploadResponse);

    if (!uploadResponse.success) {
      throw new Error(uploadResponse.error || "File upload failed");
    }

    const driveLink = uploadResponse.fileUrl;

    const values = [
      data.waitlistId,
      data.email,
      data.college,
      data.documentType,
      driveLink,
    ];

    console.log("Saving to Verification sheet:", values);
    await appendToSheet("Verification", values);

    trackEvent("verification_completed", {
      waitlistId: data.waitlistId,
      college: data.college,
    });

    return {
      success: true,
      driveLink,
      message: "Verification document uploaded successfully",
    };
  } catch (error: any) {
    console.error("Verification submission failed:", error);
    throw new Error(error.message || "Failed to upload verification document");
  }
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "jpg";
}

function getFolderNameByCollege(college: string): string {
  if (college === "GEC Raipur") return "GEC Raipur";
  if (college === "NIT Raipur") return "NIT Raipur";
  if (college === "IIIT Naya Raipur") return "IIIT Naya Raipur";
  return "Other Colleges";
}

function trackEvent(eventName: string, data?: any) {
  console.log(`[Analytics] ${eventName}`, data);
}
