import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/app.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    scss({
      output: 'build/app.css',
    })
  ]
}
