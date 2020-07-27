//配置完成后记得重启下
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {//antd按需加载
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "red" }
  }),
  addDecoratorsLegacy()//配置装饰器
);