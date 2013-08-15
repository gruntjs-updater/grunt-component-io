/*
 * grunt-component-io
 * 
 * License: MIT
 */

'use strict';


/*
 * Module dependencies
 */

var Queue = require('../lib/queue');


/*
 * component path
 */

var COMPONENT_CLI_PATH = __dirname + '/../node_modules/.bin/component';


/*
 * Helper methods
 */

var queue = new Queue();

var addComponentTask = function(grunt, args) {
  queue.add(function(next){
    grunt.util.spawn({
      cmd: COMPONENT_CLI_PATH,
      args: args
    }, function(err, res, code){
      next(err);
    });
  });
}

var getTemplatePath = function(filepath) {
  return filepath.split('.html')[0] + '.js';
}

/*
 * task
 */

module.exports = function(grunt) {

  grunt.registerMultiTask('component', 'builds component io', function() {
    
    var done = this.async();
    
    var options = this.options({
      autoload: ['scripts', 'styles', 'files'],
      convertTemplates: true,
      standalone: null
      /* out: 'tmp/' */
    });
    
    if (!options.out) {
      grunt.log.error('"out" should be present', options.out);
      return false;
    }
    
    var component = JSON.parse(grunt.file.read('component.json'));
    
    // reset component maps
    options.autoload.forEach(function(ns){
      component[ns] = []; 
    });
    
    // create files if needed
    if (!component.files) {
      component.files = [];
    }
    
    // templates to cleanup
    var convertedTemplates = [];
    
    this.files.forEach(function(f){
      f.src
        .filter(function(filepath){ 
          return grunt.file.isFile(filepath) 
        })
        .map(function(filepath){
          return { 
            path: filepath, 
            ext: filepath.split('.').pop()
          }
        })
        .forEach(function(file){
          switch(file.ext) {
          case 'js':
            if (~options.autoload.indexOf('scripts')) {
              component['scripts'].push(file.path);
            }
            break;
          case 'css':
            if (~options.autoload.indexOf('styles')) {
              component['styles'].push(file.path);
            }
            break;
          case 'html':
            var tmpl = getTemplatePath(file.path);
            if (options.convertTemplates) {
              addComponentTask(grunt, ['convert', file.path]);
              convertedTemplates.push(tmpl);
              if (~options.autoload.indexOf('scripts')) {
                component['scripts'].push(tmpl);
              }
            }
            break;
          default:
            if (~options.autoload.indexOf('files')) {
              component['files'].push(file.path);
            }
            break;
          }
        });
    });
    
    // update component.json
    grunt.file.write('component.json', JSON.stringify(component, null, 2)); 
    
    // component install
    addComponentTask(grunt, ['install']);
    
    // component build -o tmp/ -s supermodule
    if (options.standalone) {
      addComponentTask(grunt, ['build', '-o', options.out, '-s', options.standalone]);
    } else {
      addComponentTask(grunt, ['build', '-o', options.out]);
    }
    
    // delete all temp template.js
    queue.add(function(next){
      convertedTemplates.forEach(function(filepath){
        grunt.file.delete(filepath);
      });
      next();
    });
    
    // start processing queue tasks
    queue.start(function(){
      grunt.log.writeln('Component build succeeded.');
      done();
    }, function(error){ 
      grunt.log.error(error);
      done(false);
    });
    
    
  });
};
