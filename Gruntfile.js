module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: [
        'src/core.js',
        'src/utils/utils.js',
        'src/utils/ajax.js',
        'src/utils/polyfills.js',
        'src/collection.js',
        'src/queryBuildingLogic/queryBuilderBase.js',
        'src/queryBuildingLogic/country.js',
        'src/queryBuildingLogic/city.js',
        'src/queryBuildingLogic/channel.js',
        'src/queryBuildingLogic/broadcast.js'
        ],
        dest: './lib/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'lib/<%= pkg.name %>.js',
        dest: 'lib/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          asi: true,
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    jsdoc : {
      dist : {
          src: ['src/**/*.js', 'test/*.js'],
          options: {
              destination: 'doc'
          }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'jsdoc', 'concat', 'uglify']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jsdoc', 'concat', 'uglify']);

};