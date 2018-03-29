# es-vue-template

> 作为vue-cli的模版使用，具体模版内容为 [https://github.com/ketuzhong/cd-vue-pro](https://github.com/ketuzhong/cd-vue-pro)


### 安装使用

```
npm install -g vue-cli

vue init ketuzhong/cd-vue-template YourProjectName
```

### 开发命令

因为使用了git subtree ，具体模版内容作为了本仓库的子仓库，故需要如下开发命令

```
git remote add pro https://github.com/ketuzhong/cd-vue-pro.git

git subtree add --prefix=template pro custom/vue-cli

git subtree pull --prefix=template pro custom/vue-cli

git subtree push --prefix=template pro custom/vue-cli
```
