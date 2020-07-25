import React from 'react';
import ContextPage from './pages/ContextPage';
import HocPage from './pages/HocPage';

function App () {
  return (
    <div>
      {/* 组件跨层级通信 - Context */}
      {/* <ContextPage /> */}
      {/* 高阶组件 */}
      <HocPage />
    </div>
  );
}

export default App;
