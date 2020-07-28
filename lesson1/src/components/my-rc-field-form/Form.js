import React from 'react'
import FieldContext from './FieldContext'
import useForm from './useForm'


// 组件：hook
export default function Form ({ form, children, onFinish, onFinishFailed }, ref) {
  const [formInstance] = useForm(form)
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
