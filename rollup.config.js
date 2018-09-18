import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import html from 'rollup-plugin-html'
import cssnano from 'cssnano'

const cssPlugins = [
  autoprefixer({
    remove: false,
    browsers: [
      'last 5 versions',//支持最新的5个版本
      'not ie <= 8',//IE8以下不支持
    ],
  })
]
if(process.env.ENV==='production') {
  cssPlugins.push(cssnano)//压缩css文件
}

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
      processor: css => postcss(cssPlugins)
        .process(css)
        .then(result => result.css)
    })
  ]
}
