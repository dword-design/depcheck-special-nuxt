import { endent, mapValues } from '@dword-design/functions'
import depcheck from 'depcheck'
import outputFiles from 'output-files'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from '.'

const runTest = config => {
  config = { fail: false, ...config }

  return () =>
    withLocalTmpDir(async () => {
      await outputFiles(config.files)

      const result = await depcheck('.', {
        package: {
          dependencies: {
            foo: '^1.0.0',
          },
        },
        specials: [self],
      })
      expect(result.dependencies.length > 0).toEqual(config.fail)
    })
}

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
    },
  },
  buildModules: {
    files: {
      'nuxt.config.js': endent`
        export default {
          buildModules: [
            'foo',
          ],
        }
      `,
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
    },
  },
  modules: {
    files: {
      'nuxt.config.js': endent`
        export default {
          modules: [
            'foo',
          ],
        }
      `,
    },
  },
  'unused dependency': {
    fail: true,
  },
} |> mapValues(runTest)
