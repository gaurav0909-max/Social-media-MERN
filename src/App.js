
import './App.css';


import { ThemeProvider } from '@emotion/react';
import theme from './utils/theme/theme';
import { store } from './redux/index'
import Routing from './routes/Routing';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <div className="App" >
      <ThemeProvider theme={theme} />
      <SnackbarProvider>
        <Provider store={store}>
          <Routing />
        </Provider>
      </SnackbarProvider>
    </div>

  );
}

export default App;
