# @deliberative/crypto

[![codecov][codecov-image]][codecov-url]
[![Known Vulnerabilities](https://snyk.io/test/github/deliberative/utils/badge.svg?targetFile=package.json)](https://snyk.io/test/github/deliberative/utils?targetFile=package.json)
<br>
![NPM Version](https://img.shields.io/npm/v/@deliberative/utils)
![NPM License](https://img.shields.io/npm/l/@deliberative/utils)
[![code-style-prettier][code-style-prettier-image]][code-style-prettier-url]
<br>
![NPM Downloads](https://img.shields.io/npm/dw/@deliberative/utils)
[![](https://data.jsdelivr.com/v1/package/npm/@deliberative/utils/badge)](https://www.jsdelivr.com/package/npm/@deliberative/utils)

[codecov-image]: https://codecov.io/gh/deliberative/utils/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/deliberative/utils
[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-prettier-url]: https://github.com/prettier/prettier

This repository is part of the reference implementation of the Deliberative Ledger Protocol, the infrastructure for futuristic deliberative democracies.

It does not have any native dependencies and can be used in both Nodejs and the browser.

The API is not completely stable and the code has not undergone external security audits. Use at your own risk.

## Introduction

This library relies on [libsodium](https://github.com/jedisct1/libsodium) for random number generation operations, which is a battle-tested project, compiled to WebAssembly for speed. In comparison to [tweetnacl](https://github.com/dchest/tweetnacl-js) this library is much faster. Benchmarks will be posted when there is time.

We have included some utility functions that do random shuffles, pick random subsets of Uint8Arrays etc.

## Files

The [libsodium](https://github.com/deliberative/libsodium) directory contains a fork of libsodium whose only differences with the master branch of libsodium are name changes to the implementation structs.

## Getting Started

To get started you have to install the package with

```
npm install @deliberative/utils
```

You can include as ES module

```typescript
import dutils from "@deliberative/utils";
```

as CommonJS module

```javascript
const dutils = require("@deliberative/utils");
```

or as UMD in the browser with

```html
<script src="https://cdn.jsdelivr.net/npm/@deliberative/utils@0.1.5/lib/index.min.js"></script>
```

## Examples

You can visit the [examples](examples/js) folder, where you will find examples in
[CommonJS](examples/js/test.cjs), [ES module](examples/js/test.mjs) and
[html in the browser](examples/js/test.html).

For cryptographic array utilities you can use the following features

```typescript
import dutils from "@deliberative/utils";

const someRandomArray = await dutils.randomBytes(12); // 12 byte array
console.log(someRandomArray);

// Cryptographic shuffling
const someRandomArrayShuffled = await dutils.arrayRandomShuffle(
  someRandomArray,
);
console.log(someRandomArrayShuffled);

// Choose 5 elements from someRandomArray uniformly.
const someRandomSubArray = await dutils.arrayRandomSubset(someRandomArray, 5); // 5 elements
console.log(someRandomSubArray);

// Choose 5 other elements and chances are that the arrays are different
const someOtherRandomSubArray = await dutils.arrayRandomSubset(
  someRandomArray,
  5,
);
console.log(someOtherRandomSubArray);

const someRandomNumberBetween0and100 = await dutils.randomNumberInRange(0, 100);
const someOtherRandomNumberBetween0and100 = await dutils.randomNumberInRange(
  0,
  100,
);
console.log(someRandomNumberBetween0and100);
console.log(someOtherRandomNumberBetween0and100);
```

For more examples you can see the [tests](__tests__) directory.

## Development

If you want to bundle the library yourselves, you need to have [Emscripten](https://github.com/emscripten-core/emscripten)
installed on your machine in order to compile the C code into WebAssembly.
We have the `-s SINGLE_FILE=1` option for the `emcc` compiler, which converts the `wasm` file to a `base64` string
that will be compiled by the glue js code into a WebAssembly module. This was done for the purpose of interoperability
and modularity.

Once you have all the dependencies installed, you can run

```
npm run build
```

and [Rollup](https://github.com/rollup/rollup) will generate the UMD, ESM and CJS bundles.

For development compilation you can run

```
npm run build:debug
```

and everything will work in debug mode.

## Releases

Releases are available on [Github](https://github.com/deliberative/utils/releases)
and [npmjs.com](https://www.npmjs.com/package/@deliberative/utils)

## License

The source code is licensed under the terms of the Apache License version 2.0 (see [LICENSE](LICENSE)).

## Copyright

Copyright (C) 2022 Deliberative Technologies P.C.
