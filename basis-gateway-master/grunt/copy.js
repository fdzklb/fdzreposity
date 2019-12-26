'use strict';
module.exports = function(grunt) {
	grunt.config.set('copy', {
    build: {
      files: [
        {expand: true, cwd: 'src/', src: ['**'], dest: 'build/'},
        {expand: true, src: 'package.json', dest: 'build/'}
      ]
    }
	});
};
