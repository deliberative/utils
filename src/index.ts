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

import dutilsMethodsModule from "./c/build/dutilsMethodsModule";

import itemIsInArray from "./itemIsInArray";
import itemsInArray from "./itemsInArray";
import arraysAreEqual from "./arraysAreEqual";
import arrayIsNumber from "./arrayIsNumber";
import arrayRandomShuffle from "./arrayRandomShuffle";
import arrayRandomSubset from "./arrayRandomSubset";
import countOccurrencesInArray from "./countOccurrencesInArray";
import randomBytes from "./randomBytes";
import randomNumberInRange from "./randomNumberInRange";
import bigIntToUint8Array from "./bigIntToUint8Array";
import numberToUint8Array from "./numberToUint8Array";
import uint8ArrayToNumber from "./uint8ArrayToNumber";
import uint8ArrayToBigInt from "./uint8ArrayToBigInt";
import memory from "./memory";

const dutils = {
  itemIsInArray,
  itemsInArray,
  arraysAreEqual,
  arrayIsNumber,
  arrayRandomShuffle,
  arrayRandomSubset,
  countOccurrencesInArray,
  randomBytes,
  randomNumberInRange,
  bigIntToUint8Array,
  numberToUint8Array,
  uint8ArrayToNumber,
  uint8ArrayToBigInt,
  memory,
  loadModule: dutilsMethodsModule,
};

export default dutils;
