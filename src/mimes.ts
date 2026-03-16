import * as v from "valibot";
import { Extension } from "./extension.vo";
import { Mime } from "./mime.vo";
import { MimeRegistryEntry } from "./mime-registry-entry.vo";

export const Mimes = {
  csv: new MimeRegistryEntry(Mime.fromString("text/csv"), [v.parse(Extension, "csv")]),
  jpg: new MimeRegistryEntry(Mime.fromString("image/jpeg"), [
    v.parse(Extension, "jpg"),
    v.parse(Extension, "jpeg"),
  ]),
  markdown: new MimeRegistryEntry(Mime.fromString("text/markdown"), [v.parse(Extension, "md")]),
  mp4: new MimeRegistryEntry(Mime.fromString("video/mp4"), [v.parse(Extension, "mp4")]),
  pdf: new MimeRegistryEntry(Mime.fromString("application/pdf"), [v.parse(Extension, "pdf")]),
  png: new MimeRegistryEntry(Mime.fromString("image/png"), [v.parse(Extension, "png")]),
  text: new MimeRegistryEntry(Mime.fromString("text/plain"), [v.parse(Extension, "txt")]),
  webp: new MimeRegistryEntry(Mime.fromString("image/webp"), [v.parse(Extension, "webp")]),
  wav: new MimeRegistryEntry(Mime.fromString("audio/wav"), [v.parse(Extension, "wav")]),
  zip: new MimeRegistryEntry(Mime.fromString("application/zip"), [v.parse(Extension, "zip")]),
} as const;
