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

/**
 * @function
 * Converts a number in Uint8Array format back to number.
 *
 * @param array: The Uint8Array to convert.
 *
 * @returns number
 */
const uint8ArrayToNumber = (array: Uint8Array): number => {
  const arrayLen = array.length;
  const start = 0;

  if (arrayLen !== 4)
    throw new Error("Invalid array size for conversion to number.");

  const bytes = array.subarray(start, start + 4);
  let n = 0;
  for (const byte of bytes.values()) {
    n = (n << 8) | byte;
  }

  return n;
};

export default uint8ArrayToNumber;
