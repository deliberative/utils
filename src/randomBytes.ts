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
 * Returns a Uint8Array of cryptographically random bytes.
 *
 * @param n: The length of the array.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Uint8Array
 */
const randomBytes = async (
  n: number,
  module?: DUtilsMethodsModule,
): Promise<Uint8Array> => {
  const wasmMemory = module ? module.wasmMemory : utilsMemory.randomBytes(n);

  const dutilsModule =
    module ||
    (await dutilsMethodsModule({
      wasmMemory,
    }));

  const ptr = dutilsModule._malloc(n * Uint8Array.BYTES_PER_ELEMENT);
  const bytes = new Uint8Array(
    dutilsModule.HEAP8.buffer,
    ptr,
    n * Uint8Array.BYTES_PER_ELEMENT,
  );
  // const bytes = new Uint8Array(wasmMemory.buffer, 0, n);

  const result = dutilsModule._random_bytes(n, bytes.byteOffset);

  dutilsModule._free(ptr);

  if (result === 0) return new Uint8Array([...bytes]);

  throw new Error("Could not generate random data");
};

export default randomBytes;