# shader-reload-cli

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A simple GLSL development server for testing and expreimentation.

See [shader-reload](https://github.com/mattdesl/shader-reload) for details.

## Install

Use [npm](https://npmjs.com/) to install.

```sh
npm install shader-reload-cli -g
```

## Usage

Specify 

```sh
Usage:
  shader-reload-cli entry [options]

Examples:
  shader-reload-cli src/index.js
  shader-reload-cli src/index.js:bundle.js --open
  shader-reload-cli src/index.js:bundle.js --dir public/
```

Underneath the hood, this is using [budo](https://github.com/mattdesl/budo) and its command-line options.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/shader-reload-cli/blob/master/LICENSE.md) for details.
