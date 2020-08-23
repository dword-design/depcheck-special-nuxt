import { endent, mapValues } from '@dword-design/functions'
import execa from 'execa'
import outputFiles from 'output-files'
import withLocalTmpDir from 'with-local-tmp-dir'

const runTest = config => () =>
  withLocalTmpDir(async () => {
    await outputFiles({
      'depcheck.config.js': endent`
      const special = require('../src')
      module.exports = {
        specials: [
          special,
        ],
      }
    `,
      ...config.files,
    })
    try {
      await execa.command('depcheck --config depcheck.config.js')
    } catch (error) {
      expect(error.message).toMatch('Unused dependencies')
      expect(config.fail).toBeTruthy()
    }
  })

export default {
  'array syntax': {
    files: {
      'nuxt.config.js': endent`
        export default {
          modules: [
            ['foo', { bar: 'baz' }],
          ],
        }
      `,
      'package.json': JSON.stringify({
        dependencies: {
          foo: '^1.0.0',
        },
      }),
    },
  },
  function: {
    files: {
      'nuxt.config.js': endent`
        export default {
          modules: [
            'foo',
            () => {},
          ],
        }
      `,
      'package.json': JSON.stringify({
        dependencies: {
          foo: '^1.0.0',
        },
      }),
    },
  },
  'unused dependency': {
    fail: true,
    files: {
      'package.json': JSON.stringify({
        dependencies: {
          foo: '^1.0.0',
        },
      }),
    },
  },
  valid: {
    files: {
      'nuxt.config.js': endent`
        export default {
          modules: [
            'foo',
          ],
        }
      `,
      'package.json': JSON.stringify({
        dependencies: {
          foo: '^1.0.0',
        },
      }),
    },
  },
} |> mapValues(runTest)
