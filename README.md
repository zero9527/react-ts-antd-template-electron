# react-ts-antd-template

```
git clone https://github.com/zero9527/react-ts-antd-template.git

cd react-ts-antd-template

git checkout electron

yarn install/npm install

yarn start/npm start
```

> 如果在其他分支（`master`/`electron-app`）已经 `yarn install/npm install` 过了，就先删除 node_modules，再重新 `yarn install/npm install`

然后在 vscode 运行，方便调试/重启等， .vscode 的运行配置也一并上传了
> 或者在另一个终端 运行 `yarn electron-start` 或 `npm electron-start`，启动 `electron` 应用


## ipcRender 在网页上面的简单使用
参考 [这里](https://github.com/electron/electron/issues/9920#issuecomment-336757899)

* 在根目录创建 electron-src/preload.js
* package.json 中：
  > 开发运行的时候没问题，但是不将文件包含进去打包的话，安装包不包含这个文件就会报错，找不到 preload .js 了

  build.files 添加 preload.js 文件，我放在 electron-src 下，所以将这个目录都包含进去
  ```
  "build": {
    "appId": "com.example.electron-cra",
    "files": [
      "build/**/*",
      "node_modules/**/*",
      "electron-src/**/*",
      "main.js"
    ],
    "directories": {
      "buildResources": "package"
    }
  },
  ```
* main.js 中修改：
  ```
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs
      webSecurity: false,
      preload: __dirname + '/electron-src/preload.js'
    }
  });
  ```
* preload.js 如下：
  ```
  window.ipcRenderer = require('electron').ipcRenderer;
  ```
* 在 common.d.ts 中添加 
  ```
  interface Window { 
    ipcRenderer: any
  }
  ```
* 使用的时候：
  ```
  const ipcRenderer = window.ipcRenderer;
  if (ipcRenderer) {
    // electron 中打开
  } else {
    // 网页中打开
  }
  ```


## electron 打包

可以看 [electron-app](https://github.com/zero9527/react-ts-antd-template/tree/electron-app) 分支
