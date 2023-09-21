import { Provider } from 'react-redux';
import { store } from './Store';
import { MainPaige } from './pages/MainPage/MainPaige';

export function App() {
  return (<Provider store={store}>
      <MainPaige />
    </Provider>);
}


