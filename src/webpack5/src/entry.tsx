import React from "react";
import { function1 } from "./tree-shaking/module1";
import ImportPage from "./import-tree-shaking";

import TopLevelAwait from "./top-level-await";
// import ImportLodash from './import-lodash';

const Entry = () => {
  function1();

  return (
    <div style={{ fontSize: 20 }}>
      {/* <ImportLodash /> */}
      {/* <ImportPage /> */}
      {/* <TopLevelAwait /> */}
    </div>
  );
};

export default Entry;
