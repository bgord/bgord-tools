import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Email } from "../src/email.vo";
import { EmailMask } from "../src/email-mask.service";

describe("EmailMask", () => {
  test("works for 1 char", () => {
    expect(EmailMask.censor(v.parse(Email, "t@example.com"))).toEqual("*@example.com");
  });

  test("works for 2 chars", () => {
    expect(EmailMask.censor(v.parse(Email, "te@example.com"))).toEqual("**@example.com");
  });

  test("works for more than 2 chars", () => {
    expect(EmailMask.censor(v.parse(Email, "testing@example.com"))).toEqual("t*****g@example.com");
  });
});
