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
 * Returns the index of an item in an array of similar items.
 *
 * @param array: The containing array.
 * @param item: The item in question.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Promise<number>
 */
const itemIsInArray = async (
  array: Uint8Array[],
  item: Uint8Array,
  module?: DUtilsMethodsModule,
): Promise<number> => {
  const arrayLen = array.length;
  const itemLen = item.length;

  const wasmMemory = module
    ? module.wasmMemory
    : utilsMemory.itemIsInArray(arrayLen, itemLen);

  const dutilsModule =
    module ||
    (await dutilsMethodsModule({
      wasmMemory,
    }));

  const ptr1 = dutilsModule._malloc(
    arrayLen * itemLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  const arr = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr1,
    arrayLen * itemLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  for (let i = 0; i < arrayLen; i++) {
    arr.set([...array[i]], i * itemLen);
  }

  const ptr2 = dutilsModule._malloc(itemLen * Uint8Array.BYTES_PER_ELEMENT);
  const itm = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr2,
    itemLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  itm.set([...item]);

  // Result is the index of the element in array
  const result = dutilsModule._item_in_array(
    arrayLen,
    itemLen,
    arr.byteOffset,
    itm.byteOffset,
  );

  dutilsModule._free(ptr1);
  dutilsModule._free(ptr2);

  return result;
};

export default itemIsInArray;
