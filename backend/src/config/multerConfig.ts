import { randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import multer from "multer";

const imageFolder = path.resolve(__dirname, "..", "images");
mkdirSync(imageFolder, { recursive: true });

export const multerConfig = {
  storagePath: imageFolder,
  storage: multer.diskStorage({
    destination: imageFolder,
    filename: (_request, file, callback) => {
      const hash = randomBytes(16).toString("hex");
      const filename = `${hash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
