import Provider from 'react-redux/es/components/Provider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from 'app/configs/routesConfig';
import store, { persistor } from './store';
import AppContext from './AppContext';
import { PersistGate } from 'redux-persist/integration/react';

const withAppProviders = (Component) => (props) => {

  const WrapperComponent = () => (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StyledEngineProvider injectFirst>
              <Component {...props} />
            </StyledEngineProvider>
          </PersistGate>
        </Provider>
      </LocalizationProvider>
    </AppContext.Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;
