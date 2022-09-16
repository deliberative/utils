import dutils from "../src";

describe("Starting the array test suite.", () => {
  test("Array equality for different arrays works.", async () => {
    const arr1 = await dutils.randomBytes(75);
    const arr2 = await dutils.randomBytes(75);
    const areEqual = await dutils.arraysAreEqual(arr1, arr1);
    const areNotEqual = await dutils.arraysAreEqual(arr1, arr2);

    expect(areEqual).toBe(true);
    expect(areNotEqual).toBe(false);
  });

  test("Array is number works.", async () => {
    const array = new Uint8Array(64); // array of zeros
    const arrayIsNumbr = await dutils.arrayIsNumber(array, 0);
    expect(arrayIsNumbr).toBe(true);

    const array1 = new Uint8Array(64).fill(1);
    const arrayIsNotNumbr = await dutils.arrayIsNumber(array1, 0);
    expect(arrayIsNotNumbr).toBe(false);
  });

  const len = 64;
  const arr1 = new Uint8Array(len);
  const arr2 = new Uint8Array(len);
  arr1.fill(1);
  arr2.fill(2);

  const arr3 = new Uint8Array(len);
  arr3.fill(1);

  const arr4 = new Uint8Array(len);
  arr4.fill(4);

  const arrayOfArrays1: Uint8Array[] = [];
  arrayOfArrays1.push(arr2);
  arrayOfArrays1.push(arr4);
  arrayOfArrays1.push(arr2);

  test("Finding out if item is in array works.", async () => {
    const arrayOfArrays: Uint8Array[] = [];
    arrayOfArrays.push(arr4);
    arrayOfArrays.push(arr2);
    arrayOfArrays.push(arr1);
    arrayOfArrays.push(arr2);
    arrayOfArrays.push(arr4);
    const occurrence = await dutils.itemIsInArray(arrayOfArrays, arr1);

    expect(occurrence).toBe(2);

    const occurrence1 = await dutils.itemIsInArray(arrayOfArrays1, arr1);

    expect(occurrence1).toBe(-1);
  });

  test("Finding out the indexes of items in an array works.", async () => {
    const arrayOfArrays2: Uint8Array[] = [];
    arrayOfArrays2.push(arr4);
    arrayOfArrays2.push(arr2);

    const indexes = await dutils.itemsInArray(arrayOfArrays1, arrayOfArrays2);

    expect(indexes[0]).toBe(1);
    expect(indexes[1]).toBe(0);
  });

  it("Should throw an error if one of the items is not in the array.", async () => {
    const arrayOfArrays3: Uint8Array[] = [new Uint8Array(len).fill(15)];

    await expect(
      dutils.itemsInArray(arrayOfArrays1, arrayOfArrays3),
    ).rejects.toThrow("Item with index 0 was not found in the array.");
  });

  test("Item occurences in array works.", async () => {
    const arrayOfArrays: Uint8Array[] = [];
    arrayOfArrays.push(arr1);
    arrayOfArrays.push(arr2);
    arrayOfArrays.push(arr3);
    arrayOfArrays.push(arr2);
    arrayOfArrays.push(arr1);
    const occurences = await dutils.countOccurrencesInArray(
      arrayOfArrays,
      arr1,
    );

    expect(occurences).toBe(3);
  });
});
