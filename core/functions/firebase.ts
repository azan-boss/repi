const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

exports.assignUserRole = functions.https.onCall(async (data:any, context:any) => {
  // Validate request data
  const { uid, role } = data;
  if (!uid || !role) {
    throw new functions.https.HttpsError("invalid-argument", "UID and role are required.");
  }

  try {
    // Set custom claims
    await admin.auth().setCustomUserClaims(uid, { role });
    return { message: `Role ${role} has been successfully assigned to user ${uid}` };
  } catch (error) {
    console.error("Error assigning role:", error);
    throw new functions.https.HttpsError("internal", "Failed to assign role.");
  }
});
