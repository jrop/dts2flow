dts2flow
========

A utility for converting `*.d.ts` files to flow declaration files.

THIS IS A WORK IN PROGRESS AND IS NOT CURRENTLY (ANYWHERE) NEAR COMPLETE.

## Installation

This project is not (yet) ready for `npm` installs.

## Use

This project is not (yet) ready for use.

## Current Status

Currently the only component of this with any significant progress is the `*.d.ts` parser.  It parses many common syntaxes of TypeScript definitions, and is written completely in JavaScript (not TypeScript).  It has a long way to go, and needs unit tests.

## FAQ

**Q:** Why rewrite a (less feature-rich) TypeScript parser?

**A:** The answer to this question is two-fold: 1) the open-source TypeScript parser available on GitHub provided by Microsoft is more than this project needs.  This project only needs to parse _definition_ files, and thus does not need to parse the entire TypeScript syntax; 2) I have been wanting to learn top-down parsing for a while, and this seemed like the perfect project to further learning this concept.

## LICENSE (MIT)

Copyright (c) 2016 Jonathan Apodaca <jrapodaca@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
