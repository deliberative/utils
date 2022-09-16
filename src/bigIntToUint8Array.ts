// Copyright (C) 2022 Deliberative Technologies P.C.
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

const big0 = BigInt(0);
const big1 = BigInt(1);
const big8 = BigInt(8);

/**
 * @function
 * Converts a BigInt into a Uint8Array.
 *
 * @param n: BigInt
 *
 * @returns Uint8Array
 */
const bigIntToUint8Array = (n: bigint): Uint8Array => {
  if (n < big0) {
    // work out how long is the big int in bits and add 1
    const bits: bigint = (BigInt(n.toString(2).length) / big8 + big1) * big8;
    // create a BigInt that's 100000... of length of big + 1
    const prefix1: bigint = big1 << bits;
    n += prefix1;
  }
  let hex = n.toString(16);
  if (hex.length % 2) {
    hex = "0" + hex;
  }
  const len = hex.length / 2;
  const u8 = new Uint8Array(len);
  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }
  return u8;
  // const start = 0;
  // let len = start + 2; // start, length, and 1 byte min
  //
  // const bs = new Uint8Array(len);
  //
  // for (let i = 0x100n; i < n; i <<= 8n, len++);
  //
  // let r = BigInt(n);
  // for (let pos = start + 1; pos < len; pos++) {
  //   bs[pos] = Number(r & 0xffn);
  //   r >>= 8n;
  // }
  //
  // bs[start] = len - start - 1; // write byte-count to start byte
  //
  // return bs;
};

export default bigIntToUint8Array;
