import React, { Suspense, lazy } from "react";
// import Button from '@terminus/nusi/es/button';
// import { Button } from "@terminus/nusi";
import { Button } from "./nusi";

const Page = () => {
  const onClick = () => {
    console.log("page1");
  };

  return (
    <div>
      <Button onClick={onClick}>click1</Button>
    </div>
  );
};

export default Page;
