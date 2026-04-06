import { expect } from "bun:test";
import { Timestamp } from "../src/timestamp.vo";

// Tue Nov 14 2023 22:13:20 GMT+0000
export const TIME_ZERO = Timestamp.fromNumber(1700000000000);

export const TIME_ZERO_PLAIN_DATE = "2023-11-14";
export const TIME_ZERO_PLAIN_DATE_TIME = "2023-11-14T22:13:20Z";

export const IntentionalCause = "intentional.cause" as const;
export const IntentionalError = "intentional.error" as const;
export const throwIntentionalError = () => {
  throw new Error(IntentionalError);
};
export const throwIntentionalErrorAsync = async () => {
  throw new Error(IntentionalError);
};

export const IntentionalErrorNormalized = {
  cause: undefined,
  message: IntentionalError,
  name: "Error",
  stack: expect.any(String),
};
