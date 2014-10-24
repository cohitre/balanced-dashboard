/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			files: {
				src: ['dist/', 'report/', 'js/', '.bower-tmp', 'coverage/']
			}
		},

		bower: {
			install: {
				options: {
					copy: false
				}
			}
		},

		copy: {
			notfound: {
				files: [{
					cwd: './bower-components/strapped/static/notfound',
					expand: true,
					src: ['**'],
					dest: 'public/notfound'
				}]
			},
			postUglify: {
				files: [{
					expand: true,
					flatten: true,
					src: ['js/*'],
					dest: 'dist/js/'
				}]
			}
		},

		s3: {
			options: {
				access: 'public-read',
				region: 'us-west-1',
				gzip: true,
				headers: {
					'X-Employment': 'aXdhbnR0b21ha2VhZGlmZmVyZW5jZStobkBiYWxhbmNlZHBheW1lbnRzLmNvbQ=='
				}
			},
			previewCached: {
				options: {
					bucket: 'balanced-dashboard-preview',
				},
				headers: {
					'Cache-Control': 'public, max-age=86400'
				},
				upload: [{
					src: 'dist/js/*',
					dest: 'js/'
				}, {
					src: 'dist/assets/*',
					dest: 'assets/'
				}, {
					src: 'dist/css/*',
					dest: 'css/'
				}, {
					src: 'dist/images/**/*',
					dest: 'images/'
				}, {
					src: 'dist/fonts/**/*',
					dest: 'fonts/'
				}, {
					src: 'dist/files/**/*',
					dest: 'files/'
				}, {
					src: 'dist/notfound/**/*',
					rel: 'dist/notfound',
					dest: 'notfound/'
				}]
			},
			previewUncached: {
				options: {
					bucket: 'balanced-dashboard-preview',
				},
				headers: {
					'Cache-Control': 'max-age=60'
				},
				upload: [{
					src: 'dist/*',
					dest: ''
				}]
			},
			productionCached: {
				options: {
					bucket: 'balanced-dashboard',
				},
				headers: {
					'Cache-Control': 'public, max-age=86400'
				},
				upload: [{
					src: 'dist/js/*',
					dest: 'js/'
				}, {
					src: 'dist/css/*',
					dest: 'css/'
				}, {
					src: 'dist/images/**/*',
					dest: 'images/'
				}, {
					src: 'dist/fonts/**/*',
					dest: 'fonts/'
				}, {
					src: 'dist/files/**/*',
					dest: 'files/'
				}, {
					src: 'dist/notfound/**/*',
					rel: 'dist/notfound',
					dest: 'notfound/'
				}]
			},
			productionUncached: {
				options: {
					bucket: 'balanced-dashboard',
				},
				headers: {
					'Cache-Control': 'max-age=60'
				},
				upload: [{
					src: 'dist/*',
					dest: ''
				}]
			},
		},

		exec: {
			ember_build: {
				command: 'ember build'
			},
			ember_build_production: {
				command: "ember build --environment=production"
			},
			ember_server: {
				command: 'ember server'
			},
			ember_test: {
				command: 'ember test'
			}
		},

		open: {
			dev: {
				path: 'http://localhost:4200/'
			},
		},

		coveralls: {
			all: {
				src: 'coverage/**/lcov.info',
				force: true
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				createTag: true,
			    tagName: 'v%VERSION%',
			    tagMessage: 'Version v%VERSION%',
				commit: true,
				commitFiles: ['-a'],
				commitMessage: 'Release v%VERSION%',
				push: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerMultiTask('clean', 'Deletes files', function() {
		this.files.forEach(function(file) {
			file.orig.src.forEach(function(f) {
				if (grunt.file.exists(f)) {
					grunt.file.delete(f);
				}
			});
		});
	});

	/*
		grunt task commands
	*/

	grunt.registerTask('default', ['clean', 'bower', 'copy', 'exec:ember_server']);
	grunt.registerTask('test', ['bower:install', 'exec:ember_test']);
	grunt.registerTask('build', ['exec:ember_build_production']);
	grunt.registerTask('deploy', ['build', 's3:productionCached', 's3:productionUncached']);
	grunt.registerTask('deployPreview', ['build', 's3:previewCached', 's3:previewUncached']);
};
