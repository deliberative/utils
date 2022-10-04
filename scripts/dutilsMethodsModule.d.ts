/// <reference types="emscripten" />

export interface DUtilsMethodsModule extends EmscriptenModule {
  wasmMemory: WebAssembly.Memory;
  _int_to_uint8(
    n: number,
    array: number, // Uint8Array
  ): void;
  _uint8_to_int(
    array: number, // Uint8Array
  ): number;
  _arrays_are_equal(
    ARRAY_LEN: number,
    arr1: number, // Uint8Array, // byteOffset
    arr2: number, // Uint8Array
  ): number;
  _array_is_number(
    ARRAY_LEN: number,
    array: number, // Uint8Array
    numbr: number,
  ): number;
}

declare const dutilsMethodsModule: EmscriptenModuleFactory<DUtilsMethodsModule>;
export default dutilsMethodsModule;
