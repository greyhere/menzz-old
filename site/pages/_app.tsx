import '@assets/main.css';
import '@assets/chrome-bug.css';
import 'keen-slider/keen-slider.min.css';

import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';

import { Provider as StyletronProvider } from 'styletron-react';
import styletron from '@lib/styletron';

// eslint-disable-next-line react/jsx-no-useless-fragment
const Noop: FC = ({ children }) => <>{children}</>;

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head />
      <ManagedUIContext>
        <StyletronProvider value={styletron}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </StyletronProvider>
      </ManagedUIContext>
    </>
  );
};

export default App;
