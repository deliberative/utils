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
 * Converts a number into a Uint8Array.
 *
 * @param n: number
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Uint8Array
 */
const numberToUint8Array = async (
  n: number,
  module?: DUtilsMethodsModule,
): Promise<Uint8Array> => {
  const wasmMemory = module ? module.wasmMemory : utilsMemory.intToUint8();

  const dutilsModule =
    module ||
    (await dutilsMethodsModule({
      wasmMemory,
    }));

  const ptr = dutilsModule._malloc(4 * Uint8Array.BYTES_PER_ELEMENT);
  const bytes = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr,
    4 * Uint8Array.BYTES_PER_ELEMENT,
  );

  dutilsModule._int_to_uint8(n, bytes.byteOffset);

  return Uint8Array.from([...bytes]);

  // return Uint8Array.of(
  //   (n & 0xff000000) >> 24,
  //   (n & 0x00ff0000) >> 16,
  //   (n & 0x0000ff00) >> 8,
  //   (n & 0x000000ff) >> 0,
  // );
};

export default numberToUint8Array;
