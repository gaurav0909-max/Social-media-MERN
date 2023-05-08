
import './App.css';


import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';
import {store} from './redux/index'
import Routing from './routes/Routing';
import { Provider } from 'react-redux';

function App() {

  return (
    <div className="App" >
      <ThemeProvider theme={theme} />
      <Provider store={store}>
      <Routing />
      </Provider>
    </div>

  );
}

export default App;
