import { describe, expect, test } from "bun:test";

import { LeapYearChecker } from "../src/leap-year-checker.service";

describe("LeapYearChecker", () => {
  describe("isLeapYear", () => {
    test("works for 2000", () => expect(LeapYearChecker.isLeapYear(2000)).toBe(true));

    test("works for 2001", () => expect(LeapYearChecker.isLeapYear(2001)).toBe(false));

    test("works for 2024", () => expect(LeapYearChecker.isLeapYear(2024)).toBe(true));

    test("works for 2400", () => expect(LeapYearChecker.isLeapYear(2400)).toBe(true));
  });
});
