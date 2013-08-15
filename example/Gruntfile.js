/*
 * grunt-component-io
 * https://github.com/hkwd/grunt-component-io
 *
 * Author: Vladimir Popov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    clean: { tmp: ['tmp', 'tmp2'] },
    component: {
      default: ['lib/**/*'],
      options: { 
        out: 'tmp/',
        standalone: 'example',
        autoload: ['scripts', 'styles', 'files'],
        convertTemplates: true
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-component-io');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('default', ['clean', 'component']);

};
