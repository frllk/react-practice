import React from 'react'
import FieldContext from './FieldContext'
import useForm from './useForm'


// 组件：hook
export default function Form ({ form, children, onFinish, onFinishFailed }, ref) {
  const [formInstance] = useForm(form)

  // useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
  React.useImperativeHandle(ref, () => formInstance);

  console.log('formInstance', formInstance); // sys-log
  formInstance.setCallback({
    onFinish, onFinishFailed
  })
  return (
    <form onSubmit={
      event => {
        event.preventDefault()
        formInstance.submit()
      }
    }>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
