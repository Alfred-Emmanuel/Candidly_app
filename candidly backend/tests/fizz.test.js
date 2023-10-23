const fizz = require("../fizz");

describe("fizzBuzz", () => {
  it("should throw a exception if input is not a number", () => {
    expect(() => {
      fizz.fizzBuzz("a");
    }).toThrow();
  });
  it("should return FizzBuzz if input is divisible by 3 or 15", () => {
    const result = fizz.fizzBuzz(15);
    expect(result).toMatch(/FizzBuzz/);
  });
  it("should return fizz if input is divisible by 3", () => {
    const result = fizz.fizzBuzz(3);
    expect(result).toMatch(/Fizz/);
  });
  it("should return buzz if input is divisible by 5", () => {
    const result = fizz.fizzBuzz(5);
    expect(result).toMatch(/Buzz/);
  });
  it("should return the input", () => {
    const result = fizz.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
