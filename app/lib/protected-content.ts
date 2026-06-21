export interface ProtectedContent {
  kdf: string;
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
}

function bytesFromBase64(value: string) {
  const binary = globalThis.atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export async function decryptProtectedContent(
  payload: ProtectedContent,
  password: string,
) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("This browser cannot unlock protected posts.");
  }

  const encodedPassword = new TextEncoder().encode(password);
  const keyMaterial = await globalThis.crypto.subtle.importKey(
    "raw",
    encodedPassword,
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await globalThis.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: bytesFromBase64(payload.salt),
      iterations: payload.iterations,
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  const encrypted = bytesFromBase64(payload.ciphertext);
  const decrypted = await globalThis.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: bytesFromBase64(payload.iv),
    },
    key,
    encrypted,
  );

  return new TextDecoder().decode(decrypted);
}
