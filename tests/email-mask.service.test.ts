import { describe, expect, test } from "bun:test";

import { EmailMask } from "../src/email-mask.service";

describe("EmailMask", () => {
  test("works for 1 char", () => {
    expect(EmailMask.censor("te@example.com")).toEqual("**@example.com");
  });

  test("works for 2 chars", () => {
    expect(EmailMask.censor("te@example.com")).toEqual("**@example.com");
  });

  test("works for more than 2 chars", () => {
    expect(EmailMask.censor("testing@example.com")).toEqual("t*****g@example.com");
  });
});
