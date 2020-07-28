import React from "react";
import _Form from "./Form";
import Field from "./Field";
import useForm from "./useForm";

// React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
const Form = React.forwardRef(_Form);
Form.useForm = useForm;
Form.Field = Field;

export { Field, useForm };
export default Form;
