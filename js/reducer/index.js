import {combineReducers} from 'redux';
import theme from './theme';
import trending from './trending';
import popular from './popular';
import favorite from './favorite';
// import language from './language'
import search from './search';

/**
 * 合并reducer，通过combineReducers将多个reducer合并成一个根reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
  theme: theme,
  popular: popular,
  trending: trending,
  favorite: favorite,
  //    language: language,
  //   search: search,
});

export default index;
