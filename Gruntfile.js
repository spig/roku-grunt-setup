module.exports = function(grunt) {

  var rokuHost = grunt.option('host') || '127.0.0.1';
  var rokuUsername = grunt.option('username') || 'dev';
  var rokuPassword = grunt.option('password') || 'dev';

  grunt.initConfig({
    shell: {
      rokuZip: {
        command: [
          'rm -f roku-app.zip',
          'cd roku-source',
          'zip -r ../roku-app.zip .'
        ].join(' && ')
      },
      rokuUpload: {
        command: 'http --ignore-stdin -f POST http://' + rokuHost + '/plugin_install archive@./roku-app.zip mysubmit=Replace --auth ' + rokuUsername + ':' + rokuPassword + ' --auth-type digest'
      }
    },
    watch: {
      files: ['roku-source/**/*'],
      tasks: ['shell:rokuZip', 'shell:rokuUpload']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['watch']);

};
