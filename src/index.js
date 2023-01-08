import { filter, first, map } from '@dword-design/functions'
import jiti from 'jiti'
import P from 'path'

export default filename => {
  const jitiInstance = jiti(process.cwd(), {
    esmResolve: true,
    interopDefault: true,
  })
  if (P.basename(filename) === 'nuxt.config.js') {
    const config = jitiInstance(filename).default

    const modules = [...(config.modules || []), ...(config.buildModules || [])]

    return (
      modules
      |> map(mod => [].concat(mod) |> first)
      |> filter(name => typeof name === 'string')
    )
  }

  return []
}
