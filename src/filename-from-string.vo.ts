import { z } from "zod/v4";
import { Basename } from "./basename.vo";
import { Extension } from "./extension.vo";

export const FilenameTypeError = "filename.not.string" as const;
export const FilenameInvalidError = "filename.invalid" as const;

export const FilenameFromString = z
  .string(FilenameTypeError)
  .trim()
  .refine((value) => {
    const index = value.lastIndexOf(".");

    return index > 0 && index < value.length - 1;
  }, FilenameInvalidError)
  .transform((value) => {
    const index = value.lastIndexOf(".");
    const basename = Basename.parse(value.slice(0, index));
    const extension = Extension.parse(value.slice(index + 1));

    return { basename, extension };
  });

export type FilenameFromStringType = z.infer<typeof FilenameFromString>;
