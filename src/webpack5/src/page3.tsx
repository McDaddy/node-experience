import React from 'react';
import { useMount } from 'react-use';
import {isEmpty, map, get, set, forEach, find, filter, cloneDeep, isNumber, some, last, isString, ceil, isArray, isFunction, throttle, debounce, reduce, findIndex, pick, omit, clone, union, uniq, toPairs, compact, first, isEqualWith, remove } from 'lodash-es';

const Page3 = () => {
    
    
    useMount(() => {
        console.log('page3');
        isEmpty('sasd');
        console.log(isEmpty, map, get, set, forEach, find, filter, cloneDeep, isNumber, some, last, isString, ceil, isArray, isFunction, throttle, debounce, reduce, findIndex, pick, omit, clone, union, uniq, toPairs, compact, first, isEqualWith, remove);
        
    })

    const onClick = () => {
    }

    return (<div>
        <button onClick={onClick}>click3</button>
    </div>)
}

export default Page3