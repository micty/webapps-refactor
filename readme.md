
##针对页面重构的 grunt 工具


###目录结构

- `bin` 目录放置的是自动化工具，基于 nodejs 和 grunt。
- `webapps` 放置的是各个轻应用或 web-app 的集合，每个二级目录相当于开发版的 `htdocs` 目录。
- `webapps/{appName}/style/css` 是 `{appName}` app 中的 less 生成的 css 文件的输出目录。

###使用前须知
使用之前，请确保安装了 nodejs 和 grunt-cli，

在此基础上，第一次使用时，请先在命令行窗口切换到 `bin` 目录，
然后执行 `npm install` 命令以安装相应的包，依赖的包定义在 `package.json` 文件，
安装完包后，会在当前目录生成一个 `node_modules` 目录，该目录比较大，**请不要添加到 SVN 上**。

然后执行 `grunt {appName}` 命令即可执行编译和监控，具体的构建规则见 `Gruntfile.js `

>更多知识请参阅
    [NodeJs官网](http://www.nodejs.org/)
    [GruntJs官网](http://www.gruntjs.net/)

###使用方式

在 `webapps` 目录，放置的是各个轻应用的根目录，相当于开发版中的 `htdocs` 目录。
假如 `webapps` 目录中含有一个叫 `demo` 的 app 轻应用，则 `demo` 目录相当于开发版中的 `htdocs` 目录。

由于多个 app 放置在 `webapps` 目录，所以在运行 `grunt` 命令时可以指定具体的 app 名称，以便针对该 app 进行构建，而无须关注其它 app。

例如，在重构名为 `demo` 的 app 时，可以运行 **`grunt demo`** 命令对 app `demo` 进行构建，该命令会先对 `demo` 中的所有 `.less` 文件进行编译，然后进行监控。

如果想对所有的 app 进行监控，则运行 ***`grunt`** 命令即可，但该命令中会进行监控，而不是立即对里面的 `.less` 文件进行编译。

###建议
建议对具体的 app 进行构建，而不是构建所有的 app。因此，在重构 `demo` app 时，建议使用 `grunt demo` 命令进行构建。  

###less 编译成 css 的输出路径
对于 `webapps` 目录下的每个 app，其下的 less 文件经过编译后输出的 css 文件位于 app 目录中的 `style/css` 目录，
并且生成的 css 文件名会带有 less 文件所在的目录作为前缀。
例如:
- `webapps/demo/home/view.less`  ----->  `webapps/demo/style/css/home.view.css`
- `webapps/demo/user/list/panel.less`  ----->  `webapps/demo/style/css/user.list.panel.css`

这样命名可以确保多个短名称一样的 less 生成的 css 文件到 `style/css` 不会引起冲突。
