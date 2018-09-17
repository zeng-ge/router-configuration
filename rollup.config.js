import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import html from 'rollup-plugin-html'

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/app.js',
    format: 'iife',
  },
  plugins: [
    html({
      include: '**/*.html'
    }),
    typescript(),
    resolve(),
    commonjs(),
    scss({
      output: 'build/app.css',
      // processor: css => postcss([autoprefixer])
      //   .process(css)
      //   .then(result => result.css)
    })
  ]
}
