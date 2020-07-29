import React from 'react';
import ContextPage from './pages/ContextPage';
import HocPage from './pages/HocPage';
import HookPage from './pages/Hook/HookPage';

function App () {
  return (
    <div>
      {/* 组件跨层级通信 - Context */}
      {/* <ContextPage /> */}
      {/* 高阶组件 */}
      {/* <HocPage /> */}
      {/* Hook */}
      <HookPage />
    </div>
  );
}

export default App;
