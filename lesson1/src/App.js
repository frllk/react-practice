import React from 'react';
// import ContextPage from './pages/Context/ContextPage';
// import HocPage from './pages/HOC/HocPage';
// import AntdFormPage from './pages/AntdForm/AntdFormPage';
// import MyRCFieldForm from './pages/AntdForm/MyRCFieldForm';
// import MyRCForm from './pages/AntdForm/MyRCForm';
import DialogPage from './pages/DialogPage';


function App () {
  return (
    <div className="App">
      {/* 组件跨层级通信context */}
      {/* <ContextPage /> */}
      {/* 高阶组件 */}
      {/* <HocPage /> */}
      {/* antd表单 */}
      {/* <AntdFormPage /> */}
      {/* <MyRCFieldForm /> */}
      {/* <MyRCForm /> */}
      <DialogPage />
    </div>
  );
}

export default App;
