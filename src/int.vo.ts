import * as v from "valibot";
import { Integer, type IntegerType } from "./integer.vo";
import { IntegerNonNegative, type IntegerNonNegativeType } from "./integer-non-negative.vo";
import { IntegerPositive, type IntegerPositiveType } from "./integer-positive.vo";

export class Int {
  static positive(candidate: number): IntegerPositiveType {
    return v.parse(IntegerPositive, candidate);
  }

  static nonNegative(candidate: number): IntegerNonNegativeType {
    return v.parse(IntegerNonNegative, candidate);
  }

  static of(candidate: number): IntegerType {
    return v.parse(Integer, candidate);
  }
}
