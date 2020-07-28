import React from 'react'
import FieldContext from './FieldContext'
import useForm from './useForm'


// 组件：hook
export default function Form ({ form, children, onFinish, onFinishFailed }) {
  const [fromInstance] = useForm(form)
  fromInstance.setCallback({
    onFinish, onFinishFailed
  })
  return (
    <form onSubmit={
      event => {
        event.preventDefault()
        fromInstance.submit()
      }
    }>
      <FieldContext.Provider value={fromInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
