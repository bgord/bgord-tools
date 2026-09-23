import { describe, expect, test } from "bun:test";
import { ErrorNormalizer } from "../src/error-normalizer.service";
import * as mocks from "./mocks";

describe("ErrorNormalizer", () => {
  test("normalize - error instance", () => {
    const result = ErrorNormalizer.normalize(new Error(mocks.IntentionalError));

    expect(result).toEqual(mocks.IntentionalErrorNormalized);
  });

  test("normalize - error instance - cause - error", () => {
    const error = new Error(mocks.IntentionalError, { cause: new Error(mocks.IntentionalCause) });

    const result = ErrorNormalizer.normalize(error);

    expect(result).toEqual({
      ...mocks.IntentionalErrorNormalized,
      cause: { name: "Error", message: mocks.IntentionalCause, stack: expect.any(String), cause: undefined },
    });
  });

  test("normalize - error instance - cause - string", () => {
    const result = ErrorNormalizer.normalize(
      new Error(mocks.IntentionalError, { cause: mocks.IntentionalCause }),
    );

    expect(result).toEqual({
      ...mocks.IntentionalErrorNormalized,
      cause: { message: mocks.IntentionalCause },
    });
  });

  test("normalize - string", () => {
    const result = ErrorNormalizer.normalize("Something has crashed");

    expect(result).toEqual({ message: "Something has crashed" });
  });

  test("normalize - number", () => {
    const result = ErrorNormalizer.normalize(123);

    expect(result).toEqual({ message: "123" });
  });

  test("normalize - undefined", () => {
    const result = ErrorNormalizer.normalize(undefined);

    expect(result).toEqual({ message: "undefined" });
  });

  test("normalize - null", () => {
    const result = ErrorNormalizer.normalize(null);

    expect(result).toEqual({ message: "null" });
  });

  test("normalize - circular error", () => {
    const error = new Error(mocks.IntentionalError);
    error.cause = error;

    const normalized = ErrorNormalizer.normalize(error);

    expect(normalized).toEqual({
      ...mocks.IntentionalErrorNormalized,
      cause: { message: mocks.IntentionalError, name: "Error" },
    });
  });

  test("normalize - normalized error", () => {
    const result = ErrorNormalizer.normalize({
      message: mocks.IntentionalError,
      name: "Error",
      stack: "stack",
    });

    expect(result).toEqual({
      message: mocks.IntentionalError,
      name: "Error",
      stack: "stack",
      cause: undefined,
    });
  });

  test("normalize - normalized error - idempotent", () => {
    const error = new Error(mocks.IntentionalError, { cause: new Error(mocks.IntentionalCause) });

    const result = ErrorNormalizer.normalize(ErrorNormalizer.normalize(error));

    expect(result).toEqual({
      ...mocks.IntentionalErrorNormalized,
      cause: { name: "Error", message: mocks.IntentionalCause, stack: expect.any(String), cause: undefined },
    });
  });

  test("normalize - normalized error - cause", () => {
    const result = ErrorNormalizer.normalize({
      message: mocks.IntentionalError,
      cause: { message: mocks.IntentionalCause },
    });

    expect(result).toEqual({ message: mocks.IntentionalError, cause: { message: mocks.IntentionalCause } });
  });

  test("normalize - normalized error - unknown fields", () => {
    const result = ErrorNormalizer.normalize({ message: mocks.IntentionalError, token: "secret" });

    expect(result).not.toHaveProperty("token");
  });

  test("normalize - normalized error - circular", () => {
    const error: { message: string; name: string; cause?: unknown } = {
      message: mocks.IntentionalError,
      name: "Error",
    };
    error.cause = error;

    const result = ErrorNormalizer.normalize(error);

    expect(result).toEqual({
      message: mocks.IntentionalError,
      name: "Error",
      cause: { message: mocks.IntentionalError, name: "Error" },
    });
  });

  test("normalize - plain object without message", () => {
    const result = ErrorNormalizer.normalize({ code: "critical" });

    expect(result).toEqual({ message: "[object Object]" });
  });

  test("isNormalizedError - happy path", () => {
    const error = new Error(mocks.IntentionalError);
    const result = ErrorNormalizer.isNormalizedError(ErrorNormalizer.normalize(error));

    expect(result).toEqual(true);
  });

  test("isNormalizedError - not an object", () => {
    expect(ErrorNormalizer.isNormalizedError(5)).toEqual(false);
    expect(ErrorNormalizer.isNormalizedError(null)).toEqual(false);
    expect(ErrorNormalizer.isNormalizedError(undefined)).toEqual(false);
  });

  test("isNormalizedError - without message", () => {
    expect(ErrorNormalizer.isNormalizedError({ code: "critical" })).toEqual(false);
  });

  test("isNormalizedError - message not a string", () => {
    expect(ErrorNormalizer.isNormalizedError({ message: 5 })).toEqual(false);
  });
});
