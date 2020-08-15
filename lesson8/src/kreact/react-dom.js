import { TEXT, PLACEMENT, UPDATE, DELETION } from "./const";

// 下一个单元任务  fiber
let nextUnitOfWork = null;
// work in progress fiber root （正在执行的根fiber）
let wipRoot = null;

// 当前的根节点
let currentRoot = null

// work in progress fiber  （正在执行的fiber）
let wipFiber = null;

let deletions = null

/**
 * fiber架构
 * type：标记类型
 * key：标记当前层级下的唯一性
 * child：第一个子元素  fiber
 * sibling：下一个兄弟元素  fiber
 * return：父fiber
 * node：真实dom节点
 * props：属性值
 * base：上次的节点 fiber
 * effectTag：标记要执行的操作类型（删除、插入、更新）
 */


/**
 * fiber架构
 * type: 标记类型
 * key: 标记当前层级下的唯一性
 * child : 第一个子元素 fiber
 * sibling ： 下一个兄弟元素 fiber
 * return： 父fiber
 * node： 真实dom节点
 * props：属性值
 * base: 上次的节点 fiber
 * effectTag: 标记要执行的操作类型（删除、插入、更新）
 */

// ! vnode  虚拟dom对象
// ! node  真实dom
// ! node 真实dom
function render (vnode, container) {
  // // vnode->node
  // const node = createNode(vnode);
  // // 再把node插入container
  // container.appendChild(node);
  // console.log("vnode", vnode, container); //sy-log

  // 初始值
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  };
  nextUnitOfWork = wipRoot;
  deletions = []
}

// 创建node
function createNode (vnode) {
  const { type, props } = vnode;
  let node = null;
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
  }

  // 把props.children遍历，转成真实dom节点 ，再插入node
  // reconcileChildren(props.children, node);
  // 更新属性节点
  updateNode(node, {}, props);
  return node;
}

// 类组件
function updateClassComponent (fiber) {
  const { type, props } = fiber;
  let cmp = new type(props);
  const vvnode = cmp.render();
  // console.log('cmp', vvnode); // sys-log
  const { children } = vvnode.props;
  reconcileChildren(fiber, children);
  // // 生成node节点
  // const node = createNode(vvnode);
  // return node;
}

// 函数组件
function updateFunctionComponent (fiber) {
  wipFiber = fiber // 找到当前正在工作的fiber
  // 当前工作的fiber有多个Hooks函数
  wipFiber.hooks = []
  wipFiber.hookIndex = 0
  const { type, props } = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

// 更新属性值，如className、nodeValue等
function updateNode (node, prevVal, nextVal) {
  // 如果说 prevVal，nextVal中有相同的属性值，这个时候不用管
  // 如果说 prevVal里有，nextVal没有，需要遍历prevVal 执行删除操作
  // 如果说 prevVal里没有有，nextVal有，这个时候不用管
  Object.keys(prevVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // ! 源码中的合成事件（跟原生事件做的区分，onClick这种，原生是直接 click）===> 下节课讲，源码之中用到了事件代理，这里瞎写一下。
      if (k.slice(0, 2) === 'on') {
        // 简单粗暴，这是个事件
        let eventName = k.slice(2).toLowerCase()
        node.removeEventListener(eventName, prevVal[k])
      } else {
        if (!(k in nextVal)) {
          node[k] = ''
        }
      }
    });

  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // ! 源码中的合成事件（跟原生事件做的区分，onClick这种，原生是直接 click）===> 下节课讲，源码之中用到了事件代理，这里瞎写一下。
      if (k.slice(0, 2) === 'on') {
        // 简单粗暴，这是个事件
        let eventName = k.slice(2).toLowerCase()
        node.addEventListener(eventName, nextVal[k])
      } else {
        // 不是事件，当做属性
        node[k] = nextVal[k];
      }
    });
}

// ! 源码childrne可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement里）
function reconcileChildren_old (children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

// workInProgressFiber Fiber ->child->sibling
// children 数组
function reconcileChildren (workInProgressFiber, children) {
  // 构建fiber架构
  let prevSlibling = null;
  // 获取老fiber的第一个子节点 child（目前我们先不考虑顺序）
  let oldFilber = workInProgressFiber.base && workInProgressFiber.base.child
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null
    // 复用的前提是key和type都相同，这里我们先不考虑key
    const sameType = child && oldFilber && child.type === oldFilber.type
    if (sameType) {
      // 类型相同 复用
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFilber.node,
        base: oldFilber,
        return: workInProgressFiber,
        effectTag: UPDATE
      };
    }
    if (!sameType && child) {
      // 类型不相同，并且新节点存在 
      // 创建一个新的fiber
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgressFiber,
        effectTag: PLACEMENT
      };
    }
    if (!sameType && oldFilber) {
      // todo 删除节点
      oldFilber.effectTag = DELETION
      deletions.push(oldFilber)
    }

    // 链表往后走
    if (oldFilber) {
      oldFilber = oldFilber.sibling
    }

    // 形成一个链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSlibling.sibling = newFiber;
    }
    prevSlibling = newFiber;
  }
}

function updateHostComponent (fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  // 协调子元素
  const { children } = fiber.props;
  reconcileChildren(fiber, children);
  // console.log("fiber-----", fiber); //sy-log
}

function performUnitOfWork (fiber) {
  //执行当前任务 更新当前fiber节点
  const { type } = fiber;
  if (typeof type === "function") {
    // class function
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签
    updateHostComponent(fiber);
  }

  //获取下一个子任务（fiber）
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    // 找到兄弟
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 没有兄弟 往祖先上找
    nextFiber = nextFiber.return;
  }
}

function workLoop (deadline) {
  // 有下一个任务 并且当前帧没有结束
  // 这里的时间是模拟，源码当中用的过期时间，源码中的过期时间和时间单位相关内
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    //执行当前任务
    //获取下一个子任务（fiber）
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// ! 提交

function commitRoot () {
  deletions.forEach(commitWorker)
  commitWorker(wipRoot.child);
  currentRoot = wipRoot
  wipRoot = null;
}

function commitWorker (fiber) {
  if (!fiber) {
    return;
  }

  // 找到parentNode,
  // 找到最近的有node节点的祖先fiber
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }

  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    // 新增插入（dom父子关系插入）
    parentNode.appendChild(fiber.node);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    // 更新props
    updateNode(fiber.node, fiber.base.props, fiber.props)
  } else if (fiber.effectTag === DELETION && fiber.node !== null) {
    // 删除节点
    commitDeletions(fiber, parentNode)
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

// 这个parentNode是有node节点，参考上面的whild循环
function commitDeletions (fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node)
  } else {
    // 因为有些fiber没有node节点，如Consumer
    commitDeletions(fiber.child, parentNode)
  }
}

// Hooks相关

// 需要考虑： 
// 初次渲染：直接用init   初始值   
// 还是更新：更新 在init的基础上 更新
export function useState (init) {
  // 实现更新，实现点击+1的操作

  // 如何判断是初次渲染还是更新呢？ 跟diff一样，diff是新旧两棵树的比较，只需判断下有没有老的树，如果有就表示是更新阶段，没有的话就是初次渲染

  // 判断有没有老的hook
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex]
  const hook = oldHook ? { state: oldHook.state, queue: oldHook.queue } : { state: init, queue: [] }

  // 更新  hook.queue  存储了有多个action的情况
  // 更新 hook state？？？   这里模拟一下批量更新
  hook.queue.forEach(action => (hook.state = action))
  const setState = action => {
    console.log('omg', action); // sys-log
    // 每次执行setState，接收新的action，这里存到数组，因为等下要批量更新，执行遍历
    hook.queue.push(action)
    // 批量处理
    wipRoot = {
      // node
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  wipFiber.hookIndex++
  wipFiber.hooks.push(hook)

  return [hook.state, setState]
}


export default { render };
