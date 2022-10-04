const dutils = require("@deliberative/utils");

const main = async () => {
  try {
    const num = 5;
    const arr = await dutils.numberToUint8Array(num);
    const num1 = await dutils.uint8ArrayToNumber(arr);
    console.log(num === num1);

    const anotherNum = 0x1020304050607080n;
    const anotherArr = dutils.bigIntToUint8Array(anotherNum);
    const anotherNum1 = dutils.uint8ArrayToBigInt(anotherArr);
    console.log(anotherNum === anotherNum1);
  } catch (err) {
    console.error(err);
  }
};

main();
