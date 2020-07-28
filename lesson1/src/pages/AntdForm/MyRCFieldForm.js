import React, { Component, useEffect } from "react";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "../../components/my-rc-field-form";
import Input from "../../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

/* export default function MyRCFieldForm (props) {
  const [form] = Form.useForm();

  // 表单校验成功执行
  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };

  useEffect(() => {
    console.log("form", form); //sy-log
    form.setFieldsValue({ username: "default" });
  }, []);

  // 点击submit提交表单并校验
  // 1.获取数据===>数据存到哪里===>按理说应该存到组件上，但是为了点击submit的时候能够获取值进行管理，直接存到最顶层，比如存到Form的state上===>数据一旦发生变化，实现setState，整个组件都会被进行更新===>性能上会有一些问题？这个组件更新了，其他组件也会进行更新
  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
} */

export default class MyRCFieldForm extends Component {
  formRef = React.createRef();
  componentDidMount () {
    console.log("form", this.formRef.current); //sy-log
    // this.formRef.current.setFieldsValue({ username: "default" });
  }

  onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };
  render () {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passworRules]}>
            <Input placeholder="Password" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}
