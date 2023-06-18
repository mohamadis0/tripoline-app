
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { MainScreen } from './src/FirstPage/MainScreen';
import rootReducer from './src/reducers/rootReducer';

const loggerMiddleware = createLogger();
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer)
const Stack = createStackNavigator();

const store = createStore(rootReducer, undefined, composedEnhancers)


export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )
}



