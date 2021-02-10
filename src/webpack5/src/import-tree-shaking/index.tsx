import React from "react";
// 原始导入法
import { Button } from "@terminus/nusi";
// ts-import-plugin
// import Button from '@terminus/nusi/es/button';
// 对比antd
// import { Button } from './antd';


const Page = () => {
  const onClick = () => {
    console.log("page");
  };

  return (
    <div>
      <Button type="primary" onClick={onClick}>click1</Button>
    </div>
  );
};

export default Page;
