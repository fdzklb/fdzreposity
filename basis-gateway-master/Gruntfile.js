module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      target: ['src/**/*.js'],
      options: {
        fix: true,
        failOnError: false,
      },
    },
  });

  require('./grunt/clean')(grunt);
  require('./grunt/copy')(grunt);

  grunt.registerTask('default', 'Gateway default grunt task. ', []);
  grunt.registerTask('build', 'Gateway build task. ', function() {
    grunt.task.run([
      'eslint', 'clean', 'copy:build',
    ]);
  });
};
