import React from "react";
import { useMount } from "react-use";
import {
  isEmpty,
  map,
  get,
  set,
  forEach,
  find,
  filter,
  cloneDeep,
  isNumber,
  some,
  last,
  isString,
  ceil,
  isArray,
  isFunction,
  throttle,
  debounce,
  reduce,
  findIndex,
  pick,
  omit,
  clone,
  union,
  uniq,
  toPairs,
  compact,
  first,
  isEqualWith,
  remove,
} from "lodash";

const Page = () => {
  useMount(() => {
    isEmpty("sasd");
    console.log(
      isEmpty,
      map,
      get,
      set,
      forEach,
      find,
      filter,
      cloneDeep,
      isNumber,
      some,
      last,
      isString,
      ceil,
      isArray,
      isFunction,
      throttle,
      debounce,
      reduce,
      findIndex,
      pick,
      omit,
      clone,
      union,
      uniq,
      toPairs,
      compact,
      first,
      isEqualWith,
      remove
    );
  });

  const onClick = () => {};

  return (
    <div>
      <button onClick={onClick}>click</button>
    </div>
  );
};

export default Page;
