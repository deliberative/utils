import dutils from "../src";

describe("Starting the utils test suite.", () => {
  test("Number to Uint8Array and back works.", async () => {
    const num = 5;
    const arr = await dutils.numberToUint8Array(num);
    const num1 = await dutils.uint8ArrayToNumber(arr);

    expect(num1).toBe(num);

    const wasmMemory1 = dutils.memory.intToUint8();
    const wasmMemory2 = dutils.memory.uint8ToInt();
    const wasmMemory =
      Math.max(wasmMemory1.buffer.byteLength, wasmMemory2.buffer.byteLength) ===
      0
        ? wasmMemory1
        : wasmMemory2;
    const module = await dutils.loadModule({ wasmMemory });
    const arr1 = await dutils.numberToUint8Array(num, module);
    const num2 = await dutils.uint8ArrayToNumber(arr1, module);

    expect(num2).toBe(num);
  });

  test("BigInt to Uint8Array and back works.", () => {
    const num = 0x1020304050607080n;
    const arr = dutils.bigIntToUint8Array(num);
    const num1 = dutils.uint8ArrayToBigInt(arr);

    expect(num1).toBe(num);
  });

  test("Array is number works.", async () => {
    const array = new Uint8Array(64); // array of zeros
    const arrayIsNumbr = await dutils.arrayIsNumber(array, 0);
    expect(arrayIsNumbr).toBe(true);

    const array1 = new Uint8Array(64).fill(1);
    const arrayIsNotNumbr = await dutils.arrayIsNumber(array1, 0);
    expect(arrayIsNotNumbr).toBe(false);

    const wasmMemory = dutils.memory.arrayIsNumber(64);
    const module = await dutils.loadModule({ wasmMemory });
    expect(await dutils.arrayIsNumber(array1, 0, module)).toBe(false);
  });

  test("Arrays are equal works.", async () => {
    const array1 = new Uint8Array(64).fill(1);
    const array2 = new Uint8Array(64).fill(1);
    const array3 = new Uint8Array(64).fill(2);

    expect(await dutils.arraysAreEqual(array1, array2)).toBe(true);
    expect(await dutils.arraysAreEqual(array1, array3)).toBe(false);

    const wasmMemory = dutils.memory.arraysAreEqual(64);
    const module = await dutils.loadModule({ wasmMemory });
    expect(await dutils.arraysAreEqual(array2, array3, module)).toBe(false);
  });
});
