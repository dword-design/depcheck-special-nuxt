import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import depcheck from 'depcheck'
import outputFiles from 'output-files'

import self from './index.js'

export default tester(
  {
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
    'relative path': {
      fail: true,
      files: {
        'nuxt.config.js': endent`
          export default {
            modules: [
              './modules/foo.js',
            ],
          }
        `,
      },
    },
    scoped: {
      dependency: '@name/foo',
      files: {
        'nuxt.config.js': endent`
          export default {
            modules: [
              '@name/foo',
            ],
          }
        `,
      },
    },
    'scoped and subpath': {
      dependency: '@name/foo',
      files: {
        'nuxt.config.js': endent`
          export default {
            modules: [
              '@name/foo/bar',
            ],
          }
        `,
      },
    },
    subpath: {
      files: {
        'nuxt.config.js': endent`
          export default {
            modules: [
              'foo/bar',
            ],
          }
        `,
      },
    },
    'unused dependency': {
      fail: true,
    },
  },
  [
    testerPluginTmpDir(),
    {
      transform: test => {
        test = { dependency: 'foo', fail: false, ...test }

        return async () => {
          await outputFiles(test.files)

          const result = await depcheck('.', {
            package: {
              dependencies: {
                [test.dependency]: '^1.0.0',
              },
            },
            specials: [self],
          })
          expect(result.dependencies.length > 0).toEqual(test.fail)
        }
      },
    },
  ],
)
