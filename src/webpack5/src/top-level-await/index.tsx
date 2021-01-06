import React, { Suspense } from "react";

// @ts-ignore
const { Comp } = await import("./custom-large-comp");
// @ts-ignore
const Button = (await import("@terminus/nusi/es/button")).default;

const CommonComp = React.lazy(() => import("./custom-common-comp"));

const Entry = () => {
  return (
    <div>
      <Suspense fallback="loading">
        <CommonComp />
      </Suspense>
      <Comp />
      <Button>click me</Button>
    </div>
  );
};

export default Entry;
