import { describe, expect, test } from "vitest";
import { parseLine, parseObject } from "./parser";

describe("parseLine", () => {
  test("a", () => {
    expect(parseLine("a")).toStrictEqual({
      object: "a",
      descriptor: "",
    });
  });

  test("a: x", () => {
    expect(parseLine("a: x")).toEqual({
      object: "a",
      descriptor: "x",
    });
  });

  test("a - b: x", () => {
    expect(parseLine("a - b: x")).toEqual({
      object: "a - b",
      descriptor: "x",
    });
  });

  test("a + b: x", () => {
    expect(parseLine("a + b: x")).toEqual({
      object: "a + b",
      descriptor: "x",
    });
  });
});

describe("parseObject", () => {
  test("a", () => {
    expect(parseObject("a")).toStrictEqual({
      type: "Node",
      value: "a",
      left: "a",
      right: undefined,
    });
  });

  test("a - b", () => {
    expect(parseObject("a - b")).toStrictEqual({
      type: "Relationship",
      value: "a - b",
      left: "a",
      right: "b",
    });
  });

  test("a + b", () => {
    expect(parseObject("a + b")).toStrictEqual({
      type: "Integration",
      value: "a + b",
      left: "a",
      right: "b",
    });
  });
});
