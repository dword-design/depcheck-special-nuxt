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
    'unused dependency': {
      fail: true,
    },
  },
  [
    testerPluginTmpDir(),
    {
      transform: config => {
        config = { fail: false, ...config }

        return async () => {
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
        }
      },
    },
  ]
)
