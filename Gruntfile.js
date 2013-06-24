module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        meta: {
            pkg: grunt.file.readJSON('package.json'),
            lib: 'lib',
            src: 'src',
            test: 'test',
            spec: '<%= meta.test %>/spec',
            dist: 'dist',
            report: 'report',
            banner: [
                '// <%= meta.pkg.title || meta.pkg.name %>',
                '// ----------------------------------',
                '// v<%= meta.pkg.version %>',
                '//',
                '// Copyright (c) <%= grunt.template.today("yyyy") %> <%= meta.pkg.author %>',
                '// Distributed under BSD license',
                '\n'
            ].join('\n'),
            files: [
                'src/core.js',
                'src/config.js',
                'src/utils/utils.js',
                'src/utils/jsonp.js',
                'src/utils/polyfills.js',
                'src/fields/abstractfield.js',
                'src/fields/numericfield.js',
                'src/fields/textfield.js',
                'src/request.js',
                'src/collection.js',
                'src/entitybase.js',
                'src/entities/country.js',
                'src/entities/city.js',
                'src/entities/channel.js',
                'src/entities/broadcast.js'
            ]
        },

        clean: {
            dist: {
                files: [
                    { src: [ '<%= meta.dist %>/*' ], dot: true }
                ]
            }
        },

        jshint: {
            files: [ 'src/**/*.js', '!src/**/utils/**' ],
            options: {
                asi: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        jasmine: {
            options: {
                specs: '<%= meta.spec %>/**/*.spec.js',
                helpers: '<%= meta.test %>/helpers/*.js',
                keepRunner: true,
                outfile: 'SpecRunner.html'
            },

            coverage: {
                src: '<%= jasmine.all.src %>',
                options: {
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: '<%= meta.report %>/coverage.json',
                        report: '<%= meta.report %>/coverage'
                    }
                }
            },

            all: {
                src: '<%= meta.files %>'
            }
        },

        watch: {
            all: {
                files: [ '<%= meta.src %>/**/*.js', '<%= meta.spec %>/**/*.js' ],
                tasks: [ 'test', 'build' ]
            }
        },

        concat: {
            options: {
                separator: '\n\n',
                banner: '<%= meta.banner %>'
            },

            build: {
                src: '<%= meta.files %>',
                dest: '<%= meta.dist %>/<%= meta.pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },

            build: {
                src: '<%= meta.dist %>/<%= meta.pkg.name %>.js',
                dest: '<%= meta.dist %>/<%= meta.pkg.name %>.min.js'
            }
        },

        jsdoc: {
            dist: {
                src: ['src/**/*.js', 'test/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('test', [
        'jshint',
        'jasmine:all'
    ]);

    grunt.registerTask('build', [
        'clean',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('dev', [
        'test',
        'watch:all'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'jasmine:coverage',
        'build'
    ]);

    grunt.registerTask('doc',[
        'jshint',
        'jsdoc'
    ]);
};