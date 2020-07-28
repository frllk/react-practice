import React, { useRef } from 'react'




class FormStore {
  constructor() {
    this.store = {} // 存储数据，比如说 username password
    this.fieldEntities = []
    this.callbacks = {}
  }

  // 注册实例  只注册一次
  registerEntity = (entity) => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
      delete this.store[entity.props.name]
    }
  }


  setCallback = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }


  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    console.log('setFieldsValue', this.store); // sy=log
    // 对应的组件要进行更新
    // ===> 全部更新了，需要优化
    this.fieldEntities.forEach(entity => {
      const { name } = entity.props
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange()
        }
      })
    })
  }
  setFieldValue = () => { }
  // 取数据
  getFieldValue = (name) => { return this.store[name] }
  getFieldsValue = (name) => { return this.store }


  validate = () => {
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        // 出错
        err.push({
          [name]: rules.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    console.log("this.", this.fieldEntities); //sy-log
    let err = this.validate();
    // 在这⾥校验 成功的话 执⾏onFinish ，失败执⾏onFinishFailed
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      // 成功的话 执⾏onFinish
      onFinish(this.getFieldsValue());
    } else if (err.length > 0) {
      // ，失败执⾏onFinishFailed
      onFinishFailed(err);
    }
  };


  getForm () {
    return {
      registerEntity: this.registerEntity,
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      getFieldValue: this.getFieldValue,
      submit: this.submit,
      setCallback: this.setCallback
    }
  }
}



// useForm是一个自定义hook，自定义hook有一个功能，就是共享逻辑
export default function useForm (form) {
  const formRef = useRef() // hook方法
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      // new 一个
      const formStore = new FormStore()
      formRef.current = formStore
    }
  }

  return [formRef.current]
}