import { z } from "zod/v4";
import { Basename } from "./basename.vo";
import { Extension } from "./extension.vo";

export const FilenameFromStringSchema = z
  .string()
  .trim()
  .refine((string) => {
    const index = string.lastIndexOf(".");

    return index > 0 && index < string.length - 1;
  }, "filename_invalid")
  // split and validate parts using existing schemas
  .transform((string) => {
    const index = string.lastIndexOf(".");
    const basename = Basename.parse(string.slice(0, index));
    const extension = Extension.parse(string.slice(index + 1));

    return { basename, extension };
  });
export type FilenameFromString = z.infer<typeof FilenameFromStringSchema>;
