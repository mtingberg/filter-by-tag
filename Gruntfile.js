/*jslint node: true */
module.exports = function (grunt) {
    'use strict';

    // Load tasks from package.json matching "grunt-*"
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            'dest': '.',
            'app_bower_dir': 'bower_components',
            'app_js_dir': 'js',
            'app_js_vendor_dir': '<%= config.app_js_dir %>/vendor',
            'app_js_vendor_src_dir': '<%= config.app_js_vendor_dir %>/src',
            'example_dir': 'example',
            'example_js_dir': '<%= config.example_dir %>/js',
            'example_js_vendor_dir': '<%= config.example_js_dir %>/vendor',
            'dest_file_no_suffix' : 'filter-by-tag'
        },

        // ----------------------------
        // building
        // ----------------------------

        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: [
                    '<%= config.app_js_dir %>/config.js',
                    '<%= config.app_js_dir %>/create-text-element-container.js',
                    '<%= config.app_js_dir %>/get-data-tag-values-on-element.js',
                    '<%= config.app_js_dir %>/create-button-item.js',
                    '<%= config.app_js_dir %>/tag-button.js',
                    '<%= config.app_js_dir %>/tag-button-bar.js',
                    '<%= config.app_js_dir %>/tagged-item.js',
                    '<%= config.app_js_dir %>/tagged-item-list.js',
                    '<%= config.app_js_dir %>/filterer.js'
                ],
                dest: '<%= config.dest %>/<%= config.dest_file_no_suffix %>.js'
            }
        },

        // our copy options
        copy: {
            example: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.dest %>',
                        src: '<%= config.dest_file_no_suffix %>.js',
                        dest: '<%= config.example_js_dir %>'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_js_vendor_dir %>',
                        src: '*.js',
                        dest: '<%= config.example_js_vendor_dir %>'
                    }

                ]
            },

            // initial setup
            bowertodev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_bower_dir %>',
                        src: [
                            'jquery/dist/jquery.js',
                            'underscore/underscore.js'
                        ],
                        dest: '<%= config.app_js_vendor_src_dir %>'
                    }
                ]
            }
        },

        // ----------------------------
        // tidying up
        // ----------------------------

        // In case of permission errors when deleting on Win7, update the grunt-contrib-clean
        // dependency 'rimraf' to (at least) version 2.2.8 (npm install rimraf@2.2.8)
        // http://stackoverflow.com/questions/23541343/grunt-clean-fail-unable-to-delete-tmp-file-eperm-operation-not-permitted

        clean: {
            build: [
                '<%= config.dest %>/<%= config.dest_file_no_suffix %>.*'
            ],
            example: [
                '<%= config.example_js_dir %>/**/*'
            ]
        },

        // ----------------------------
        // minification
        // ----------------------------

        uglify: {
            build: {
                options: {
                    sourceMap: false
                },
                files: {
                    '<%= config.dest %>/<%= config.dest_file_no_suffix %>.min.js':
                        ['<%= config.dest %>/<%= config.dest_file_no_suffix %>.js']
                }
            },
            vendorFiles: {
                options: {
                    sourceMap: false,
                    mangle: {
                        except: ['jQuery']
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_js_vendor_src_dir %>',
                        extDot: 'last',
                        src: '*.js',
                        dest: '<%= config.app_js_vendor_dir %>',
                        ext: '.min.js'
                    }
                ]
            }
        },

        // ----------------------------
        // hinting and linting
        // ----------------------------

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '<%= config.app_js_dir %>/*.js']
        },

        eslint: {
            options: {
                rulesdir: ['conf/rules']
            },
            target: ['Gruntfile.js', '<%= config.app_js_dir %>/*.js']
        },

        // ----------------------------
        // unit testing
        // ----------------------------

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        // ----------------------------
        // background build tasks
        // ----------------------------

        watch: {
            build: {
                files: ['<%= config.app_js_dir %>/*.js'],
                tasks: ['release']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'example/**/*'
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: 8888,
                    livereload: true,
                    base: [
                        'example'
                    ]
                }
            }
        }
    });

    grunt.registerTask('setup-devenv', 'Prepares the dev env after cloning the repo, and npm/bower install',
        ['copy:bowertodev', 'uglify:vendorFiles']);

    grunt.registerTask('build', 'All build steps',
        ['clean:build', 'jshint', 'concat:build', 'uglify:build']);

    grunt.registerTask('release', 'All build steps (also create example dir)',
        ['clean', 'build', 'test', 'copy:example']);

    grunt.registerTask('test', ['karma:unit']);

    grunt.registerTask('server', 'Minimum number of build steps, live reload and watch',
        ['clean', 'concat:build', 'copy:example', 'connect:server', 'watch']);

    grunt.registerTask('default', 'Default task', ['jshint']);
};