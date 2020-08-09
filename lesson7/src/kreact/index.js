/**
 * 实现createElement
 * 为什么要实现createElement？
 *  => 因为写jsx，jsx预编译会编译成React.createElement形式
 * 
 */

import { TEXT } from "./const"

/**
 * 创建react element，并返回
 * @param {*} type 
 * @param {*} config 
 * @param  {...any} children 
 */
function createElement (type, config, ...children) {
  if (config) {
    delete config.__self
    delete config.__source
  }

  // 这个地方我们自己写的没有考虑细节，比如key、ref等
  const props = {
    ...config,
    // 这个处理是我们自己写的,源码中并没有这么处理  ====>   为了统一的处理方式，全都变成数组   ===>   后面再去处理的时候，就不用再去判断是单个对象还是多个数组，只是为了便利而已，源码中并没有这么做
    children: children.map(child =>
      typeof child === "object" ? child : createTextNode(child)
    )
  }
  return {
    type,
    props
  }
}

function createTextNode (text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  }
}


export default {
  createElement
}