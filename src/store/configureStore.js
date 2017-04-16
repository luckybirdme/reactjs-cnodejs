import {compose,createStore ,applyMiddleware} from 'redux'
import reducers from './reducers/index'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'





export default function configureStore() {
	const loggerMiddleware = createLogger()

	const store = createStore(
		reducers,
		undefined,
		compose(
		    applyMiddleware(
				thunkMiddleware,
				loggerMiddleware
			),
		    autoRehydrate()
		)

	)

	persistStore(store)



	if (module.hot) {
		module.hot.accept(() => {
		  const nextRootReducer = require('./reducers/index').default;
		  store.replaceReducer(nextRootReducer);
		});
	}

  	return store;

};