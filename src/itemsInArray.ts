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
 * Returns an array of indexes of items in an array.
 *
 * @param array: The containing array.
 * @param items: The items in question.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Promise<number[]>
 */
const itemsInArray = async (
  array: Uint8Array[],
  items: Uint8Array[],
  module?: DUtilsMethodsModule,
): Promise<number[]> => {
  const arrayLen = array.length;
  const itemsArrayLen = items.length;
  const itemLen = items[0].length;

  const wasmMemory = module
    ? module.wasmMemory
    : utilsMemory.itemsInArray(arrayLen, itemsArrayLen, itemLen);

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
  let i;
  for (i = 0; i < arrayLen; i++) {
    arr.set([...array[i]], i * itemLen);
  }

  const ptr2 = dutilsModule._malloc(
    itemsArrayLen * itemLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  const itms = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr2,
    itemsArrayLen * itemLen * Uint8Array.BYTES_PER_ELEMENT,
  );
  for (i = 0; i < itemsArrayLen; i++) {
    itms.set([...items[i]], i * itemLen);
  }

  const ptr3 = dutilsModule._malloc(
    itemsArrayLen * Int32Array.BYTES_PER_ELEMENT,
  );
  const indxs = new Int32Array(
    dutilsModule.HEAP32.buffer,
    ptr3,
    itemsArrayLen * Int32Array.BYTES_PER_ELEMENT,
  );

  dutilsModule._items_in_array(
    arrayLen,
    itemsArrayLen,
    itemLen,
    arr.byteOffset,
    itms.byteOffset,
    indxs.byteOffset,
  );

  dutilsModule._free(ptr1);
  dutilsModule._free(ptr2);

  const indexes: number[] = [];
  for (i = 0; i < itemsArrayLen; i++) {
    if (indxs[i] >= 0) {
      indexes.push(indxs[i]);
    } else {
      if (indxs[i] === -1) {
        dutilsModule._free(ptr3);
        throw new Error(`Item with index ${i} was not found in the array.`);
      } else if (indxs[i] === -2) {
        dutilsModule._free(ptr3);
        throw new Error(`Item with index ${i} has a duplicate.`);
      } else {
        dutilsModule._free(ptr3);
        throw new Error("Unexpected error occured.");
      }
    }
  }

  dutilsModule._free(ptr3);

  return indexes;
};

export default itemsInArray;
