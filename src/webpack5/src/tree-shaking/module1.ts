import { function3 } from './module2';

export const function1 = () => {
  console.log('function1');
  // function3();
}

export const function2 = () => {
  console.log('function2');
  function3();
}
