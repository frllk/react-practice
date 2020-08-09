// ! vnode 虚拟dom对象
// ! node  真实dom

import { TEXT } from "./const";

// vnode ===> node ===> 再把node插入container
function render (vnode, container) {
  // vnode -> node -> 再把node插入container
  const node = createNode(vnode)
  // 再把node插入container
  container.appendChild(node)
  console.log('vnode', vnode, container); // sys-log
}

// 创建node
function createNode (vnode) {
  const { type, props } = vnode
  let node = null
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode('')
  } else if (typeof type === "string") {
    node = document.createElement(type)
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode)
  } else {
    {/* <>： Fragment，没有类型值 */ }
    node = document.createDocumentFragment()
  }

  // 把props.children遍历，转成真实dom节点，再插入node
  reconcileChilren(props.children, node)

  // 处理属性值的更新 ===> 更新属性节点
  updateNode(node, props)

  return node
}

// 函数组件
function updateFunctionComponent (vnode) {
  const { type, props } = vnode
  // 函数组件直接执行
  const vvnode = type(props)

  // 生成node节点
  const node = createNode(vvnode)
  return node
}

// 类组件 => 直接实例化
function updateClassComponent (vnode) {
  const { type, props } = vnode
  // 类组件直接实例化
  let cmp = new type(props)
  const vvnode = cmp.render()
  // 生成node节点
  const node = createNode(vvnode)
  return node
}

// 更新属性值，如className，nodeValue等
function updateNode (node, nextVal) {
  Object.keys(nextVal).filter(k => k !== 'children').forEach(k => {
    node[k] = nextVal[k]
  })
}

// ! 源码中children可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement中处理的）  遍历
function reconcileChilren (children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node)
      }
    } else {
      render(child, node)
    }
  }
}

export default {
  render
}