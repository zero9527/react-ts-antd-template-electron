# react-ts-antd-template-electron

切换到当前分支 `electron-app`，建议单独拉一份代码，因为两个分支的依赖是不一样的，只要将 `electron` 分支 build 的文件拉过来即可
```
git checkout electron-app
```

## electron 打包
按照以下操作可以减少大概 `40M` 的安装包大小（mac）

* build: `electron分支` 构建好的前端项目
* main.js: `electron` 入口文件
* package.json: 将前端项目的相关依赖删掉，只保留 `electron` 用到的依赖
* node_modules: 先删掉，等 `package.json` 改好后，再次 `yarn install/npm install`
* dist: `electron` 打包输出的文件、安装包等

### electron 打包需要的文件结构
```
.
├── build
├── node_modules
├── main.js
└── package.json
```

如当前分支 `electron-app`，结构如上；

### `package.json` 如下：
> 注意 preload.js 要写入 build.files 下，不然打包时是不会被包含进去的！！！

```json
{
  "name": "react-ts-antd-template-electron",
  "version": "0.1.1",
  "homepage": ".",
  "main": "main.js",
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
  "scripts": {
    "electron-build": "electron-builder"
  },
  "dependencies": {},
  "devDependencies": {
    "electron": "^6.0.7",
    "electron-builder": "^21.2.0"
  }
}
```
