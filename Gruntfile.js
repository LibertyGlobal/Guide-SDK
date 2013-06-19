module.exports = function (grunt) {

    grunt.initConfig({

        meta: {
            pkg: grunt.file.readJSON('package.json'),
            tmp: 'tmp',
            src: 'src',
            dist: 'dist',
            banner: [
                '// <%= meta.pkg.title || meta.pkg.name %>',
                '// ----------------------------------',
                '// v<%= meta.pkg.version %>',
                '//',
                '// Copyright (c) <%= grunt.template.today("yyyy") %> <%= meta.pkg.author %>',
                '\n'
            ].join('\n')
        },

        clean: {
            dist: {
                files: [
                    { src: [ '<%= meta.dist %>/*' ], dot: true }
                ]
            }
        },

        rig: {
            options: {
                banner: '<%= meta.banner %>'
            },

            compile: {
                files: {
                    '<%= meta.dist %>/sdk.js': 'build.js',
                    '<%= meta.dist %>/amd/sdk.js': 'build-amd.js'
                }
            }
        },

        bumpup: {
            options: {
                dateformat: 'YYYY-MM-DD HH:mm',
                normalize: true
            },

            files: [
                'package.json'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask('default', [
        'clean',
        'rig'
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