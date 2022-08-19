import { prop } from "remeda";

export const Parser = {
  parse(text: string) {
    console.log(text);
  },
};

export const parseLine = (text: string) => {
  const regexp = /^(?<object>[^:]+)(: (?<descriptor>.+))?$/g;
  const { object, descriptor = "" } = Array.from(text.matchAll(regexp)).map(prop("groups")).at(0) ?? {};
  if (!object) {
    throw new Error(`LineError: object required`);
  }

  return {
    object,
    descriptor,
  } as const;
};

export const parseObject = (value: string) => {
  if (!value.includes(" ")) {
    return {
      value,
      type: "Node",
      left: value,
      right: undefined,
    } as const;
  }

  const regexp = /^(?<left>\S+) (?<operator>[+-]) (?<right>\S)?$/g;
  const { left, operator, right } = Array.from(value.matchAll(regexp)).map(prop("groups")).at(0) ?? {};
  if (!left) {
    throw new Error(`ObjectError: left required`);
  }
  if (!operator) {
    throw new Error(`ObjectError: invalid operator`);
  }
  if (!right) {
    throw new Error(`ObjectError: right required`);
  }

  return {
    value,
    type: operator === "+" ? "Integration" : "Relationship",
    left,
    right,
  } as const;
};
