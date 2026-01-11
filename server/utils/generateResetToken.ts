// export function generateRandomPassword(length = 8) {
//   const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let pass = "";
//   for (let i = 0; i < length; i++) {
//     pass += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return pass;
// }



// import crypto from "crypto";

// export function generateResetToken() {
//   const token = crypto.randomBytes(20).toString("hex");
//   const expire = Date.now() + 3600_000; // 1 שעה
//   return { token, expire };
// }
