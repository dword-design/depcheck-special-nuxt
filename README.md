<!-- TITLE/ -->
# depcheck-special-nuxt
<!-- /TITLE -->

<!-- BADGES/ -->
[![NPM version](https://img.shields.io/npm/v/depcheck-special-nuxt.svg)](https://npmjs.org/package/depcheck-special-nuxt)
![Linux macOS Windows compatible](https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue)
[![Build status](https://github.com/dword-design/depcheck-special-nuxt/workflows/build/badge.svg)](https://github.com/dword-design/depcheck-special-nuxt/actions)
[![Coverage status](https://img.shields.io/coveralls/dword-design/depcheck-special-nuxt)](https://coveralls.io/github/dword-design/depcheck-special-nuxt)
[![Dependency status](https://img.shields.io/david/dword-design/depcheck-special-nuxt)](https://david-dm.org/dword-design/depcheck-special-nuxt)
![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen)

<a href="https://gitpod.io/#https://github.com/dword-design/bar">
  <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod">
</a><a href="https://www.buymeacoffee.com/dword">
  <img
    src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
    alt="Buy Me a Coffee"
    height="32"
  >
</a><a href="https://paypal.me/SebastianLandwehr">
  <img
    src="https://dword-design.de/images/paypal.svg"
    alt="PayPal"
    height="32"
  >
</a><a href="https://www.patreon.com/dworddesign">
  <img
    src="https://dword-design.de/images/patreon.svg"
    alt="Patreon"
    height="32"
  >
</a>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Depcheck special that detects dependencies in nuxt modules.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
## Install

```bash
# NPM
$ npm install depcheck-special-nuxt

# Yarn
$ yarn add depcheck-special-nuxt
```
<!-- /INSTALL -->

## Usage

Custom specials are currently only supported when using `depcheck` via the Node.js API. Simply add the special to your depcheck config and run depcheck:

```js
import depcheck from 'depcheck'
import nuxtSpecial from 'depcheck-special-nuxt'

const options = {
  specials: [
    nuxtSpecial,
  ],
}

depcheck(process.cwd(), options, unused => {
  console.log(unused.dependencies); // an array containing the unused dependencies
  console.log(unused.devDependencies); // an array containing the unused devDependencies
  console.log(unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
  console.log(unused.using); // a lookup indicating each dependency is used by which files
  console.log(unused.invalidFiles); // files that cannot access or parse
  console.log(unused.invalidDirs); // directories that cannot access
})
```

<!-- LICENSE/ -->
## License

Unless stated otherwise all works are:

Copyright &copy; Sebastian Landwehr <info@dword-design.de>

and licensed under:

[MIT License](https://opensource.org/licenses/MIT)
<!-- /LICENSE -->
