import React from "react";
import { RouterContext } from "./Context";

// 高阶组件：接收WrappedComponent组件作为参数
// props：WrappedComponent组件的参数

const withRouter = WrappedComponent => props => {
  return (
    <RouterContext.Consumer>
      {context => {
        return <WrappedComponent {...props} {...context} />;
        // WrappedComponent组件 原先的props照常返回，同时把root props（） 赋到prop上
        return <WrappedComponent {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};
export default withRouter;