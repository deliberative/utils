/// <reference types="emscripten" />

export interface DUtilsMethodsModule extends EmscriptenModule {
  wasmMemory: WebAssembly.Memory;
  _arrays_are_equal(
    ARRAY_LEN: number,
    arr1: number, // Uint8Array, // byteOffset
    arr2: number, // Uint8Array
  ): number;
  _item_in_array(
    ARRAY_LEN: number,
    ITEM_LEN: number,
    array: number, // Uint8Array byteOffset
    item: number, // Uint8Array byteOffset
  ): number;
  _items_in_array(
    ARRAY_LEN: number,
    ITEM_LEN: number,
    ITEMS_ARRAY_LEN: number,
    array: number, // Uint8Array byteOffset
    items: number, // Uint8Array byteOffset
    indexes: number, // Array byteOffset
  ): void;
  _occurrences_in_array(
    ARRAY_LEN: number,
    ITEM_LEN: number,
    array: number, // Uint8Array byteOffset
    item: number, // Uint8Array byteOffset
  ): number;
  _array_is_number(
    ARRAY_LEN: number,
    array: number, // Uint8Array
    numbr: number,
  ): number;
  _random_bytes(
    SIZE: number,
    array: number, // Uint8Array
  ): number;
  _random_number_in_range(MIN: number, MAX: number): number;
}

declare const dutilsMethodsModule: EmscriptenModuleFactory<DUtilsMethodsModule>;
export default dutilsMethodsModule;
