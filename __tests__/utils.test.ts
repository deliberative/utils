import dutils from "../src";

describe("Starting the utils test suite.", () => {
  test("Number to Uint8Array and back works.", () => {
    const num = 5;
    const arr = dutils.numberToUint8Array(num);
    const num1 = dutils.uint8ArrayToNumber(arr);

    expect(num1).toBe(num);
  });

  test("BigInt to Uint8Array and back works.", () => {
    const num = BigInt(3); // 0x1020304050607080n;
    const arr = dutils.bigIntToUint8Array(num);
    const num1 = dutils.uint8ArrayToBigInt(arr);

    expect(num1).toBe(num);
  });
});
