import babelRegister from '@babel/register'
import { filter, first, map } from '@dword-design/functions'
import P from 'path'

export default filename => {
  if (P.basename(filename) === 'nuxt.config.js') {
    babelRegister()
    const config = require(filename)
    const modules = [...(config.modules || []), ...(config.buildModules || [])]
    return (
      modules
      |> map(mod => [].concat(mod) |> first)
      |> filter(name => typeof name === 'string')
    )
  }
  return []
}
