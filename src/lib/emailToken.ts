import crypto from "crypto";
import { z } from "zod";

const algorithm = "aes-256-cbc"; //Using AES encryption

const emailTokenSecret = z.string().parse(process.env.EMAIL_TOKEN_SECRET);
const key = crypto
  .createHash("sha256")
  .update(String(emailTokenSecret))
  .digest("base64")
  .substr(0, 32);

const iv = crypto.randomBytes(16);

export function encryptEmail(text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const result = {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };

  const base64 = Buffer.from(JSON.stringify(result)).toString("base64");

  return base64;
}

const encryptedShape = z.object({
  iv: z.string(),
  encryptedData: z.string(),
});

// Decrypting text
export function decryptEmail(base64: string) {
  const jsonParsed = JSON.parse(Buffer.from(base64, "base64").toString());

  const { encryptedData, iv } = encryptedShape.parse(jsonParsed);

  const encryptedText = Buffer.from(encryptedData, "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv, "hex"),
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
