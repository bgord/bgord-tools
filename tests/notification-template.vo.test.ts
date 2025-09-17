import { describe, expect, test } from "bun:test";
import { NotificationTemplate } from "../src/notification-template.vo";

describe("NotificationTemplate", () => {
  test("get", () => {
    expect(new NotificationTemplate("abc", "def").get()).toEqual({ subject: "abc", html: "def" });
  });
});
