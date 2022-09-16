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
 * Checks whether two arrays are equal.
 *
 * @param array1: The first array.
 * @param array2: The second array.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Promise<boolean>
 */
const arraysAreEqual = async (
  array1: Uint8Array,
  array2: Uint8Array,
  module?: DUtilsMethodsModule,
): Promise<boolean> => {
  if (
    array1.constructor.name !== "Uint8Array" ||
    array2.constructor.name !== "Uint8Array"
  ) {
    return false;
  }

  const arrayLen = array1.length;
  if (arrayLen !== array2.length) return false;

  const wasmMemory = module
    ? module.wasmMemory
    : utilsMemory.arraysAreEqual(arrayLen);

  const dutilsModule =
    module ||
    (await dutilsMethodsModule({
      wasmMemory,
    }));

  const ptr1 = dutilsModule._malloc(arrayLen * Uint8Array.BYTES_PER_ELEMENT);
  const arr1 = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr1,
    arrayLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  arr1.set([...array1]);

  const ptr2 = dutilsModule._malloc(arrayLen * Uint8Array.BYTES_PER_ELEMENT);
  const arr2 = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr2,
    arrayLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  arr2.set([...array2]);

  const result = dutilsModule._arrays_are_equal(
    arrayLen,
    arr1.byteOffset,
    arr2.byteOffset,
  );

  dutilsModule._free(ptr1);
  dutilsModule._free(ptr2);

  return result === 1;
};

export default arraysAreEqual;
