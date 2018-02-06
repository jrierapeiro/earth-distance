'use strict';

module.exports = function (grunt) {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  require('load-grunt-tasks')(grunt);

  const lintFiles = [
    'utils/**/*.js',
    'test/**/*.js',
    'services/**/*.js',
    './gruntfile.js',
    './app.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      validate: {
        options: {
          fix: false
        },
        src: lintFiles
      },
      fix: {
        options: {
          fix: true
        },
        src: lintFiles
      }
    }
  });

  grunt.registerTask('default', ['eslint:validate']);
};
