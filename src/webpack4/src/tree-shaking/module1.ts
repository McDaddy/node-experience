import { function3 } from './module2';

const function1 = () => {
  console.log('function1');
}

const function2 = () => {
  console.log('function2');
  function3();
}

export { function1, function2 }