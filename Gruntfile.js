//Wrapper function
//Nodes way of exposing config to rest of application
module.exports = function(grunt){

	//Configure grunt
	grunt.initConfig({

		watch:{
			stylesheets: {
				files: ['src//*.css','src//*.less'],
				tasks: ['less','cssmin']
			},
			scripts: {
				files: 'src/**/*.js',
				tasks: ['jshint','uglify']
			}
		},

		//get config info from package.json
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			build: ['Gruntfile.js', 'src/**/*.js']
		},

		uglify: {
			options: {
				banner : '/*\n <%= pkg.name %><%= grunt.template.today("yyyy-mm-dd")%> \n/\n'
			},
			dev : {

				//only file we will work on 
				files: {
					'dist/js/magic.min.js': 'src/js/magic.js'
				}
			},
			prod : {
				// uglify all files
				files:{
					'dist/js/magic.min.js':'src/**/*.js'
				}
			}
		},

	});
	grunt.registerTask('default',['jshint','uglify']);
	grunt.registerTask('dev',['jshint','uglify:dev']);
	grunt.registerTask('prod',['jshint','uglify:prod']);

	//Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('jshint-stylish');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

};