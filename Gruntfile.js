
module.exports = function (grunt) {
'use strict';

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dist: {
            options: {
                separator: '\n\r',
                banner: "/*Minified CSS*/",
            },
            src: [
                'app/js/util/cookies.js', 
                'app/js/util/confirm.js', 
                'app/js/util/render.js', 
                'app/js/util/CSV.js', 
                'app/js/models/notification.js',
                'app/js/models/timer.js',
                'app/js/models/clock.js',
                'app/js/models/picker.js',
                'app/js/models/grouper.js',
                'app/js/view/timery.js',
                'app/js/view/settings.js',
                'app/js/view/pickery.js',
                'app/js/view/groupery.js',
                'app/js/main.js'
            ],
            dest: 'app/js/teachery.combine.js'
        }
    },

    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        build: {
            src: ['app/js/teachery.combine.js'],
            dest: 'app/js/teachery.min.js'
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-concat');

grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['concat', 'uglify']);
};
