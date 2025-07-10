import { describe, expect, test } from "bun:test";
import { z } from "zod";

import { Filter, FilterSchemaType, FilterValuesType } from "../src/filter.vo";

describe("Filter class", () => {
  // Define a sample schema for testing
  const sampleSchema: FilterSchemaType<{
    name: z.ZodString;
    age: z.ZodNumber;
  }> = z.object({
    name: z.string(),
    age: z.number(),
  });

  test("parses filter values based on the schema", () => {
    const filter = new Filter(sampleSchema);

    const filterValues: FilterValuesType = {
      name: "John Doe",
      age: 25,
    };

    const parsedFilter = filter.parse(filterValues);
    // @ts-expect-error
    expect(parsedFilter).toEqual(filterValues);
  });

  test("gets the default filter", () => {
    const filter = new Filter(sampleSchema);

    const defaultFilter = filter.default();
    // @ts-expect-error
    expect(defaultFilter).toEqual(undefined);
  });

  test("parses filter values with default values", () => {
    const schemaWithDefaults = sampleSchema.extend({
      age: z.number().default(30),
    });

    const filterWithDefaults = new Filter(schemaWithDefaults);

    // Values without age should default to 30
    const filterValuesWithoutAge: FilterValuesType = {
      name: "John Doe",
    };
    const parsedFilterWithoutAge = filterWithDefaults.parse(filterValuesWithoutAge);
    expect(parsedFilterWithoutAge).toEqual({ name: "John Doe", age: 30 });

    // Values with age provided should override the default
    const filterValuesWithAge: FilterValuesType = {
      name: "John Doe",
      age: 25,
    };
    const parsedFilterWithAge = filterWithDefaults.parse(filterValuesWithAge);
    expect(parsedFilterWithAge).toEqual({ name: "John Doe", age: 25 });
  });

  // Add more tests as needed based on your specific use cases
});
