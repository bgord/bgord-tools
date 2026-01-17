import { Extension } from "./extension.vo";
import { Mime } from "./mime.vo";

export const Mimes = {
  csv: { mime: Mime.fromString("text/csv"), extensions: [Extension.parse("csv")] },
  jpg: { mime: Mime.fromString("image/jpeg"), extensions: [Extension.parse("jpg"), Extension.parse("jpeg")] },
  markdown: { mime: Mime.fromString("text/markdown"), extensions: [Extension.parse("md")] },
  mp4: { mime: Mime.fromString("video/mp4"), extensions: [Extension.parse("mp4")] },
  pdf: { mime: Mime.fromString("application/pdf"), extensions: [Extension.parse("pdf")] },
  png: { mime: Mime.fromString("image/png"), extensions: [Extension.parse("png")] },
  text: { mime: Mime.fromString("text/plain"), extensions: [Extension.parse("txt")] },
  webp: { mime: Mime.fromString("image/webp"), extensions: [Extension.parse("webp")] },
  wav: { mime: Mime.fromString("audio/wav"), extensions: [Extension.parse("wav")] },
  zip: { mime: Mime.fromString("application/zip"), extensions: [Extension.parse("zip")] },
} as const;
