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

import utilsMemory from "./memory";

import dutilsMethodsModule from "./c/build/dutilsMethodsModule";

import type { DUtilsMethodsModule } from "./c/build/dutilsMethodsModule";

/**
 * @function
 * Checks whether all the elements of a Uint8Array are a specific number.
 *
 * @param array: The array.
 * @param num: The number to check against.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Promise<boolean>
 */
const arrayIsNumber = async (
  array: Uint8Array,
  num: number,
  module?: DUtilsMethodsModule,
): Promise<boolean> => {
  const arrayLen = array.length;

  const wasmMemory = module
    ? module.wasmMemory
    : utilsMemory.arrayIsNumber(arrayLen);

  const dutilsModule =
    module ||
    (await dutilsMethodsModule({
      wasmMemory,
    }));

  const ptr = dutilsModule._malloc(arrayLen * Uint8Array.BYTES_PER_ELEMENT);
  const arr = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr,
    arrayLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  arr.set([...array]);

  const result = dutilsModule._array_is_number(arrayLen, arr.byteOffset, num);

  dutilsModule._free(ptr);

  return result === 1;
};

export default arrayIsNumber;
