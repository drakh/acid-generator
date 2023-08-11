# euclidean-rhythms

[![example branch parameter](https://github.com/mkontogiannis/euclidean-rhythms/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/mkontogiannis/euclidean-rhythms/actions/workflows/main.yml)
[![Codecov](https://img.shields.io/codecov/c/gh/mkontogiannis/euclidean-rhythms.svg?style=flat-square)](https://codecov.io/gh/mkontogiannis/euclidean-rhythms)
[![npm](https://img.shields.io/npm/v/euclidean-rhythms.svg?style=flat-square)](https://www.npmjs.com/package/euclidean-rhythms)
[![npm](https://img.shields.io/npm/dt/euclidean-rhythms.svg?style=flat-square)](https://www.npmjs.com/package/euclidean-rhythms)

A micro-library in javascript that calculates the rhythmical patterns of equally distributed pulses in available steps.
It implements the bjorklund's algorithm that is described by Godfried Toussaint in [The Euclidean algorithm generates traditional musical rhythms](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

## Purpose

I made this library in 2016; I couldn't find an implementation that yields to the expected results as described on the paper above and also being well tested with unit tests and code coverage.

The current solution is a javascript / typescript interpretation of the python code that is retrieved from [atonalmicroshores.com](http://www.atonalmicroshores.com/2014/03/bjorklund-py/)

## Usage

### Node.js

Run `npm install euclidean-rhythms`

Then in your javascript / typescript code:

`const er = require('euclidean-rhythms');`

or in es6

`import {getPattern} from 'euclidean-rhythms';`

`let cumbia = getPattern(3, 4);`<br />
cumbia should be [ 1, 0, 1, 1 ]

`let cinquillo = getPattern(5, 8);`<br />
cinquillo should be [ 1, 0, 1, 1, 0, 1, 1, 0 ]

etc ...

### Browser

\*\* There is currently no umd bundle support from tsup, will be added as long as there is need for it; in the meantime you can use the older pre-typescript version of it.

Use one of the prepared browser bundles from [unpkg.com](https://unpkg.com) <br />
[https://unpkg.com/euclidean-rhythms@2.0.1/dist/bundle.umd.js](https://unpkg.com/euclidean-rhythms@2.0.1/dist/bundle.umd.js) <br />
[https://unpkg.com/euclidean-rhythms@2.0.1/dist/bundle.umd.min.js](https://unpkg.com/euclidean-rhythms@2.0.1/dist/bundle.umd.min.js) <br />

Then in your javascript code:

`var pattern = euclideanRhythms.getPattern(5, 13);`<br />
pattern should be : [ 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0 ]

## Develop

Clone the git repository and cd into it.
Run `npm run test` for executing the unit tests and `npm run build` to build the ems, commonjs and iife bundles and the type definitions.
