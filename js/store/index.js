import {applyMiddleware, createStore} from 'redux';
// import thunk from 'redux-thunk';
import reducers from '../reducer';
const thunk = require('redux-thunk').thunk; 
/**
 * 自定义log中间件
 * 关于中间件的更多解释可参考：https://cn.redux.js.org/docs/advanced/Middleware.html
 * @param store
 */
//这里用到了JS的函数柯里化，logger = store => next => action => 是函数柯里化的ES6写法
const logger = store => next => action => {
  if (typeof action === 'function') {
    // console.log('dispatching a function');
  } else {
    // console.log('dispatching ', action);
  }
  const result = next(action);
  console.log('nextState1 ', store.getState());
  return result;
};

//设置中间件
const middlewares = [logger, thunk];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
