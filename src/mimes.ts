import { Extension } from "./extension.vo";
import { Mime } from "./mime.vo";
import { MimeRegistryEntry } from "./mime-registry-entry.vo";

export const Mimes = {
  csv: new MimeRegistryEntry(Mime.fromString("text/csv"), [Extension.parse("csv")]),
  jpg: new MimeRegistryEntry(Mime.fromString("image/jpeg"), [
    Extension.parse("jpg"),
    Extension.parse("jpeg"),
  ]),
  markdown: new MimeRegistryEntry(Mime.fromString("text/markdown"), [Extension.parse("md")]),
  mp4: new MimeRegistryEntry(Mime.fromString("video/mp4"), [Extension.parse("mp4")]),
  pdf: new MimeRegistryEntry(Mime.fromString("application/pdf"), [Extension.parse("pdf")]),
  png: new MimeRegistryEntry(Mime.fromString("image/png"), [Extension.parse("png")]),
  text: new MimeRegistryEntry(Mime.fromString("text/plain"), [Extension.parse("txt")]),
  webp: new MimeRegistryEntry(Mime.fromString("image/webp"), [Extension.parse("webp")]),
  wav: new MimeRegistryEntry(Mime.fromString("audio/wav"), [Extension.parse("wav")]),
  zip: new MimeRegistryEntry(Mime.fromString("application/zip"), [Extension.parse("zip")]),
} as const;
