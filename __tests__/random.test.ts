import dutils from "../src";

describe("Starting the cryptographic random utils test suite.", () => {
  test("Generation without module works.", async () => {
    const len = 34 * 1024;
    const message = await dutils.randomBytes(len);
    expect(message.length).toBe(len);
    expect(message[0] === message[Math.ceil((2 * len) / 3)]).toBe(false);
  });

  test("Generation with module works.", async () => {
    const len = 34 * 1024;
    const randomBytesMemory = dutils.memory.randomBytes(len);
    const randomBytesModule = await dutils.loadModule({
      wasmMemory: randomBytesMemory,
    });

    const initialMessage = await dutils.randomBytes(len, randomBytesModule);
    let anotherMessage: Uint8Array;
    for (let i = 0; i < 10; i++) {
      anotherMessage = await dutils.randomBytes(len, randomBytesModule);

      const condition =
        anotherMessage[0] === initialMessage[0] &&
        anotherMessage[Math.ceil((2 * len) / 3)] ===
          initialMessage[Math.ceil((2 * len) / 3)];

      expect(condition).toBe(false);
    }
  });

  test("Choosing a random number from a range works.", async () => {
    const min = 1;
    const max = 1000000;
    const someNumber = await dutils.randomNumberInRange(min, max);
    const someOtherNumber = await dutils.randomNumberInRange(min, max);
    expect(min).toBeLessThanOrEqual(someNumber);
    expect(someNumber).toBeLessThanOrEqual(max);
    expect(someNumber === someOtherNumber).toBe(false);
  });

  test("Random shuffling of array works.", async () => {
    const arrayOneElement = [1];
    const arrayOneElementShuffled = await dutils.arrayRandomShuffle(
      arrayOneElement,
    );
    expect(arrayOneElement[0] === arrayOneElementShuffled[0]).toBe(true);

    const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = await dutils.arrayRandomShuffle(someArray);

    // Resulting array is of equal length.
    expect(shuffled.length === someArray.length).toBe(true);

    // Shuffled elements are the same as array.
    expect(someArray.sort().toString() === shuffled.sort().toString()).toBe(
      true,
    );

    const reshuffled = await dutils.arrayRandomShuffle(someArray);

    let everyElementInSamePlace = true;
    for (let i = 0; i < reshuffled.length; i++) {
      if (someArray[i] !== reshuffled[i]) {
        everyElementInSamePlace = false;
      }
    }

    expect(everyElementInSamePlace).toBe(false);
  });

  test("Random subset of array works.", async () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const subset = await dutils.arrayRandomSubset(array, array.length - 3);

    expect(subset.length).toBe(array.length - 3);

    for (let i = 0; i < subset.length; i++) {
      expect(array.includes(subset[i])).toBe(true);
    }
  });

  it("Should be impossible to ask for more shuffled elements than original", async () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    await expect(
      dutils.arrayRandomSubset(array, array.length + 1),
    ).rejects.toThrow("Not enough elements in the array");
  });
});