// Google Sheets Integration Service
// This service communicates with Google Apps Script Web App

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

interface GoogleScriptRequest {
  action: string;
  data: any;
}

export async function callGoogleScript(request: GoogleScriptRequest) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Google Script call failed:", error);
    throw error;
  }
}

export async function appendToSheet(sheetName: string, values: any[]) {
  return callGoogleScript({
    action: "appendRow",
    data: {
      sheetName,
      values,
    },
  });
}

export async function updateCell(sheetName: string, row: number, column: number, value: any) {
  return callGoogleScript({
    action: "updateCell",
    data: {
      sheetName,
      row,
      column,
      value,
    },
  });
}

export async function uploadToDrive(fileData: {
  fileName: string;
  mimeType: string;
  base64Data: string;
  folderId: string;
}) {
  return callGoogleScript({
    action: "uploadFile",
    data: fileData,
  });
}
