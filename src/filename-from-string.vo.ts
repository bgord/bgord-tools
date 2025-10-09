import { z } from "zod/v4";
import { Basename } from "./basename.vo";
import { Extension } from "./extension.vo";

// TODO
export const FilenameTypeError = "filename.not.string" as const;
export const FilenameInvalidError = "filename.invalid" as const;

// .+ at least one character, advances to the last dot
// .
// .+ at least one character
const DOT_WITH_SIDES = /^.+\..+$/;

export const FilenameFromString = z
  .string(FilenameTypeError)
  .trim()
  .regex(DOT_WITH_SIDES, FilenameInvalidError)
  .transform((value) => {
    const index = value.lastIndexOf(".");

    const basename = Basename.parse(value.slice(0, index));
    const extension = Extension.parse(value.slice(index + 1));

    return { basename, extension };
  });

export type FilenameFromStringType = z.infer<typeof FilenameFromString>;
