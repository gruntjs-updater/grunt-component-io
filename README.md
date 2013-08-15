# grunt-component-io

> Component.io task

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-component-io --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-component-io');
```

## The "component" task

### Overview
In your project's Gruntfile, add a section named `component` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  component: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.autoload
Type: `Array`
Default value: `['scripts', 'styles', 'files']`

Component requires explicity defined resources, `autoload` will populate appropriate sections from source folder, in component.json, eg. `'scripts': ['test/lib/a.js','test/lib/b.js']`, `'styles': ['bootstrap/bootstrap.min.css', 'custom.css']`, `'files': ['fonts/font.ttf']`
Note: be careful using `autoload: ['styles']`, task will concatenate stylesheets in alphabetical order

#### options.convertTemplates
Type: `Boolean`
Default value: `true`

Converts `html` files into `js` templates. If you want automaticly include generated templates to component.json make sure `autoload: ['scripts']` is present

#### options.out
Type: `String`
Default value: `'tmp/'`

Folder, to place the output of `component build`, (`build.js`)

#### options.standalone
Type: `String`
Default value: `null`

Standalone package name. If present, will build component in standalone mode, eg. `window['standalone_pkg_name'] = require('package');`
Otherwise normal component wrapper will be used, eg. `require('package');`

### Usage Examples

#### Default Options
In this example, the default options are used to do build component from lib folder. All javascript files will be placed in tmp/build.js, all html files will be converted to templates (`index.html > index.js`) and added to build.js, all css files will be concatenated and placed in tmp/build.css, all other files will be referenced in component.json under `files`, symlink will be created `tmp/<%= component.name %>/lib/fonts/font.ttf`

```js
grunt.initConfig({
  component_io: {
    default: ['lib/**/*'],
  },
})
```

## Contributing
feel free to

## Release History
_0.1.0_ - initial release