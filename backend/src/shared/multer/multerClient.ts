import multer from "multer";
import { multerConfig } from "../../config/multerConfig";

export const multerClient = multer({
  dest: multerConfig.storagePath,
  storage: multerConfig.storage,
});
