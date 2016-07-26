//包装函数
module.exports = function(grunt) {
    //任务配置
    grunt.initConfig({
        //获取 package.json 的信息
        pkg: grunt.file.readJSON('package.json'),
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
        //检查js文件
        jshint:{
            build:["Gruntfile.js","src/*.js"],
            options:{
                jshintrc:'.jshintrc'
            }
        },
        //监控
        watch:{
            build:{
                files:["Gruntfile.js","src/*.js"],
                tasks:['jshint','uglify'],
                options:{spawn:false}
            }
        }
    });

    //使用插件
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    //创建自定义任务
    grunt.registerTask('default', ['jshint','uglify','watch']);
};