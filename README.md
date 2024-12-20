# Sono Toolkit

**A toolkit to help with sonorisation computations for [Node.js](https://nodejs.org).**

## Table of content

* [Installation](#Installation)
* [Features](#Features)
* [Documentation](#Documentation)
* [Examples](#Examples)
* [Tests](#Tests)
* [Contributors](#Contributors)
* [License](#License)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 20 or higher is required.

```bash
npm install sono-toolkit
```

## Features

* Various calculators
* Fully typed
* Focus on high performance
* High test coverage
* Executable for generating applications quickly

## Documentation
Available [here](https://eloi-lfrg.github.io/sono-toolkit/)

## Examples

>For now, you can only compute limitation threshold for some limiter types. More functions are planned to be implemented.

#### Limiter threshold calculator :
```ts
import {
    ChargeTypeEnum,
    computeLimiterThreshold,
    LimiterThresholdParams,
    LimiterTypeEnum
} from 'sono-toolkit'

const params: LimiterThresholdParams = {
    limiterType: LimiterTypeEnum.DBU,
    chargeType: ChargeTypeEnum.CLOSE,
    hpPower: 1600,
    impedance: 4,
    ampPower: 2000,
    ampGain: 32
}

const limiter = computeLimiterThreshold(params);
console.log(limiter)
// Outputs 4.5 in dB
```

Available limiter types are :
* dBu
* T.Racks DS2/4
* Behringer DCX 2496

#### Compressor attack calculator :
```ts
import {
    computeCompressorAttack
} from 'sono-toolkit'

const attack = computeCompressorAttack(90);
console.log(attack)
// Outputs 12 in ms
```

#### Compressor release calculator :
```ts
import {
    computeCompressorRelease
} from 'sono-toolkit'

const release = computeCompressorRelease(90);
console.log(release)
// Outputs 354 in ms
```

## Tests

To run the test suite, first install the dependencies:

```bash
npm install
```

Then run `npm test`:

```bash
npm run test
```

## Contributors

**Eloi Lafargue** - [github](https://github.com/eloi-lfrg)

## License

[MIT](LICENSE)
