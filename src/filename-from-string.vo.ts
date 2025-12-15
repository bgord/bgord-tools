import { z } from "zod/v4";
import { Basename } from "./basename.vo";
import { Extension } from "./extension.vo";

export const FilenameFromStringError = {
  Type: "filename.from.string.type",
  Invalid: "filename.from.string.Invalid",
};

// .+ at least one character, advances to the last dot
// .
// .+ at least one character
const DOT_WITH_SIDES = /^.+\..+$/;

export const FilenameFromString = z
  .string(FilenameFromStringError.Type)
  .regex(DOT_WITH_SIDES, FilenameFromStringError.Invalid)
  .transform((value) => {
    const index = value.lastIndexOf(".");

    const basename = Basename.parse(value.slice(0, index));
    const extension = Extension.parse(value.slice(index + 1));

    return { basename, extension };
  });

export type FilenameFromStringType = z.infer<typeof FilenameFromString>;
