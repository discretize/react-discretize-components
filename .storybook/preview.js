import { CacheProvider } from '@emotion/react';
import { baseTheme, ThemeProvider as GW2UIThemeProvider } from 'gw2-ui-bulk';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './createStore';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore();
const cache = createCache({ key: 'mui-css', prepend: true });

console.log(baseTheme);
export const decorators = [
  (Story) => (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Story />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  ),
];
