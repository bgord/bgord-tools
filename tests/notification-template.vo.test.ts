import { describe, expect, test } from "bun:test";
import { NotificationTemplate } from "../src/notification-template.vo";

describe("NotificationTemplate", () => {
  test("get", () => {
    const result = new NotificationTemplate("abc", "def");
    expect(result.get()).toEqual({ subject: "abc", html: "def" });
  });
});
