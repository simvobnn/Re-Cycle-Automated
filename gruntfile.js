module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            build: {
                cwd: "src",
                src: ["*.html"],
                dest: "dist",
                filter: "isFile",
                tasks: "compressImages",
                expand: true
            },
            fonts: {
                cwd: "src/fonts",
                src: ["**"],
                dest: "dist/fonts",
                expand: true
            },
            images: {
                cwd: "src/images",
                src: ["**"],
                dest: "dist/images",
                expand: true
            }
        },
        compressImages: {
            prod: {
                input_path: 'src/images/*.{jpg,png}',
                output_path: 'dist/images/',
                options: {
                  compress_force: false, 
                  statistic: true, 
                  autoupdate: true,
                  pathLog: './log/lib/compress-images'
                },
                jpg: {
                  engine: 'mozjpeg',
                  command: ['-quality', '60']
                },
                png: {
                  engine: 'pngquant',
                  command: ['--quality=20-50']
                }
            }
        },        
        sass: {
            dist: {
                files: {
                    "dist/css/styles.css" : "src/styles.scss"
                }
            }
        },
        cssmin: {
            minify: {
                src: "dist/css/styles.css",
                dest: "dist/css/minified/styles.min.css"
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        "dist/css/minified/styles.min.css",
                        "dist/*.html",
                        "src/*.html"
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./dist"
                }
            }
        },
        watch: {
            css: {
                files: "src/styles.scss",
                tasks: ["sass", "cssmin"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-compress-images')
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask("default", ["copy","browserSync","watch"]);
    

}