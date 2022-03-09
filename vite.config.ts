import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: '@discretize/react-discretize-components',
      fileName: (format) => `react-discretize-components.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'tss-react',
        'tss-react/mui',
        '@mui/material',
        '@mui/material/styles',
        '@mui/icons-material',
        '@mui/styles',
        '@discretize/gw2-ui-new',
        '@emotion/react',
        '@emotion/styled',
        'classnames',
        'typeface-fira-mono',
        'typeface-menomonia',
        'typeface-muli',
        'typeface-raleway',
      ],
      output: { globals: { react: 'React' } },
    },
  },
  plugins: [react()],
});
