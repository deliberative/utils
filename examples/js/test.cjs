const dutils = require("@deliberative/utils");

const main = async () => {
  try {
    // Random Uint8Array array of 32 elements
    const message = await dutils.randomBytes(32);

    console.log(`Random message: ${Buffer.from(message).toString("hex")}`);

    const someRandomArray = await dutils.randomBytes(12); // 12 byte array
    console.log("Some random array");
    console.log(someRandomArray);

    // utilsgraphic shuffling
    const someRandomArrayShuffled = await dutils.arrayRandomShuffle(
      someRandomArray,
    );
    console.log("The same array shuffled");
    console.log(someRandomArrayShuffled);

    // Choose 5 elements from someRandomArray uniformly.
    const someRandomSubArray = await dutils.arrayRandomSubset(
      someRandomArray,
      5,
    ); // 5 elements
    console.log("5 random elements of the array");
    console.log(someRandomSubArray);

    // Choose 5 other elements and chances are that the arrays are different
    const someOtherRandomSubArray = await dutils.arrayRandomSubset(
      someRandomArray,
      5,
    );
    console.log(
      "Another 5 random elements from the array. They should be different from the previous ones",
    );
    console.log(someOtherRandomSubArray);

    const min = 0;
    const max = 100;
    const someRandomNumberBetween0and100 = await dutils.randomNumberInRange(
      min,
      max,
    );
    console.log(
      `A random number from ${min} to ${max} is ${someRandomNumberBetween0and100}`,
    );

    const someOtherRandomNumberBetween0and100 =
      await dutils.randomNumberInRange(min, max);
    console.log(
      `Another random number from ${min} to ${max} is ${someOtherRandomNumberBetween0and100}`,
    );
  } catch (err) {
    console.error(err);
  }
};

main();
