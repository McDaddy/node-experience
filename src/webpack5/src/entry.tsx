import React from "react";
import { function1 } from "./tree-shaking/module1";
import ImportPage from "./import-tree-shaking";

import TopLevelAwait from "./top-level-await";
// import ImportLodash from './import-lodash';

const Entry = () => {
  function1();

  const [count, setCount] = React.useState(1);

  const onClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount((current) => current + 1)
    setCount((current) => current + 1)
  }

  return (
    <div style={{ fontSize: 20 }}>
      {/* <div>{count}</div>
      <button onClick={onClick}>click</button> */}
      {/* <ImportLodash /> */}
      <ImportPage />
      {/* <TopLevelAwait /> */}
    </div>
  );
};

export default Entry;
