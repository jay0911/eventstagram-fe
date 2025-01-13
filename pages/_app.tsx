// pages/_app.tsx
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head'; // Import Head
import theme from '../theme';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css';
import ReactQueryProvider from 'contexts/ReactQueryProvider';
import { store } from 'store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            {/* Add the favicon link */}
            <link rel="icon" href="/favicon.ico" />
            {/* Optional: Add other metadata */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Eventstagram</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ReactQueryProvider>
  );
}

export default MyApp;