

module.exports = function (grunt) {

    
    require('./modules/Date');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');


    var workingDir = '../webapps/';     //工作目录。



    var name = grunt.cli.tasks[0];      //输入的任务名称。 这里当作是 app 名称
    


    grunt.registerTask(name || 'default', function () {
       
        var pattern = workingDir + '**/*.less';
        var files = [];

        //如果指定了具体的 app 名称，则针对该 app 进行处理。
        if (name) {
            pattern = workingDir + name + '/**/*.less';
            files.push(pattern);
        }


        var path = require('path');

        //找出被修改的 less 文件的最小集合
        grunt.event.on('watch', function (action, file) {
            var ext = path.extname(file).toLowerCase();
            if (ext == '.less') {
                files.push(file);
            }
        });

        grunt.registerTask('reset', function () {
            files.length = 0; //这里不能使用 files = []，因为 `less` 任务引用了 files 的指针。
        });


        grunt.initConfig({
            'less': {
                'dev': {
                    options: {
                        compress: false,
                    },
                    expand: true,
                    ext: '.css',
                    src: files,

                    //把 css 生成到每个 app 下的 `style/css` 目录。
                    rename: function (src, dest) {
                        var items = dest.split('/');
                        var htdocs = items.slice(0, 3).join('/') + '/';

                        dest = htdocs + 'style/css/' + items.slice(3).join('.');
                        return dest;
                    },
                },
            },

            'watch': {
                'less': {
                    files: [ pattern ],
                    tasks: [
                        'less',
                        'reset',
                    ],
                    options: {
                        spawn: false,
                        event: ['changed', 'added', 'renamed'],
                    },
                },
            },
        });

        //如果指定了具体的 app 名称，则针对该 app 立即编译所有 less 文件。
        if (name) {
            grunt.task.run('less');
        }

        //开始监控。
        grunt.task.run('watch');
        
    });

};