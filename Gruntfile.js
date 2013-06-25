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
                'src/main.js',
                'src/utils/utils.js',
                'src/utils/jsonp.js',
                'src/config.js',
                'src/request.js',
                'src/fields/abstractfield.js',
                'src/fields/numericfield.js',
                'src/fields/textfield.js',
                'src/collection.js',
                'src/entitybase.js',
                'src/entities/broadcast.js',
                'src/entities/channel.js',
                'src/entities/city.js',
                'src/entities/country.js'
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
//            files: [ 'src/**/*.js', '!src/**/utils/**' ],
            files: [ 'src/**/*.js' ],
            options: {
                jshintrc: ".jshintrc"
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
                tasks: [ 'test' ]
            }
        },

        rig: {
            options: {
                banner: '<%= meta.banner %>'
            },

            compile: {
                files: {
                    '<%= meta.dist %>/<%= meta.pkg.name %>.js': '<%= meta.src %>/umd.js'
                }
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

        bumpup: {
            options: {
                dateformat: 'YYYY-MM-DD HH:mm',
                normalize: true
            },

            files: [ 'package.json' ]
        }

//        jsdoc: {
//            dist: {
//                src: ['src/**/*.js', 'test/*.js'],
//                options: {
//                    destination: 'doc'
//                }
//            }
//        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-rigger');
//    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('test', [
        'jshint',
        'jasmine:all'
    ]);

    grunt.registerTask('build', [
        'clean',
        'rig',
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
        'jsdoc'
    ]);

    grunt.registerTask('updatePackage', function () {
        grunt.config.set('meta.pkg', grunt.file.readJSON('package.json'));
    });

    grunt.registerTask('release', function (type) {
        type = type || 'patch';

        grunt.task.run('bumpup:' + type);
        grunt.task.run('updatePackage');
        grunt.task.run('default');
    });
};