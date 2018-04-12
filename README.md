# es-vue-template

> 作为vue-cli的模版使用

### 安装使用

```
npm install -g vue-cli

vue init codeages-design/cd-vue-template YourProjectName
```

### 开发命令

因为使用了git subtree ，具体模版内容作为了本仓库的子仓库，故需要如下开发命令

```
git remote add template https://github.com/codeages-design/cd-vue-pro.git

git subtree add --prefix=template template custom/vue-cli

git subtree pull --prefix=template template custom/vue-cli

git subtree push --prefix=template template custom/vue-cli
```
