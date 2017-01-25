const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
       .sass('board.scss')
       .webpack('app.js')
       .webpack('main.js')
       .copy('node_modules/bootstrap-sass/assets/fonts/bootstrap/*','public/fonts/')
       .browserSync({
       		proxy : 'trillo.test',
       		files : [
       			'public/css/board.css',
       			'public/index.html',
                        'resources/views/welcome.blade.php',
       			'resources/assets/js/main.js'
       		]
       });
});
