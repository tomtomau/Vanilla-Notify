/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    distFolder: 'dist',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    uglify: {
      app: {
        src: 'vanilla-notify.js',
        dest: '<%= distFolder %>/vanilla-notify.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: '*.js'
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: '',
          cssDir: '<%= distFolder %>/',
          environment: 'production'
        }
      }
    },
    copy: {
      scss: {
        src: 'vanilla-notify.scss',
        dest: 'dist/_vanilla-notify.scss'
      },
      js : {
        src: 'vanilla-notify.js',
        dest: 'dist/vanilla-notify.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['default'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: '*.js',
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: '*.scss',
        tasks: ['compass', 'copy'],
        options: {
          spawn: false
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'compass', 'copy', 'uglify']);

};
