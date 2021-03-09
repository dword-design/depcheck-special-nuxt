import { filter, first, map } from '@dword-design/functions'
import jiti from 'jiti'
import P from 'path'

const jitiInstance = jiti(__filename)

export default filename => {
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
