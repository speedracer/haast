import typescript from 'rollup-plugin-typescript2'
import { keys } from 'lodash'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  external: keys(pkg.dependencies),
  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json'
    })
  ]
}
