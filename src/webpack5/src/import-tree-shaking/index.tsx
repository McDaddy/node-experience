import React from "react";
// 原始导入法
// import { Button } from "@terminus/nusi";
// ts-import-plugin
// import Button from '@terminus/nusi/es/button';
// 对比antd
// import { Button } from './antd';
// 原始nusi导入法
// import { Button } from "./nusi";
// es导出法
import { Button } from "./nusi/nusi-es";


const Page = () => {
  const onClick = () => {
    console.log("page");
  };

  return (
    <div>
      <Button onClick={onClick}>click1</Button>
    </div>
  );
};

export default Page;
