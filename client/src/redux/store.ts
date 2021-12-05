import { createStore, compose } from 'redux';

import rootReducer from './root-reducer';

export const store = createStore(
  rootReducer,
  compose(
      //  @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export type Store = ReturnType<typeof rootReducer>