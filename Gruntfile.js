//包装函数
module.exports = function(grunt) {
    // npm install --save-dev load-grunt-tasks 
    require('load-grunt-tasks')(grunt); 
    
    //任务配置
    grunt.initConfig({
        //获取 package.json 的信息
        pkg: grunt.file.readJSON('package.json'),
        //检查js文件
        jshint:{
            build:["Gruntfile.js","src/*.js"],
            options:{
                jshintrc:'.jshintrc'
            }
        },
        //压缩js文件
        uglify:{
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        //监控
        watch:{
            build:{
                files:["Gruntfile.js","src/*.js"],
                tasks:['jshint','uglify'],
                options:{spawn:false}
            }
        },
        //babel for complie the EC6
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/app.js': 'src/app.js'
                }
            }
        }
    });

    //使用插件
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    //创建自定义任务
    //grunt.registerTask('default', ['jshint','uglify','watch']);
    grunt.registerTask('ec6', ['babel']);
};