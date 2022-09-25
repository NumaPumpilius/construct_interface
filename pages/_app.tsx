import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { NavProvider } from '../context/navContext';
import Layout from '../components/Layout'
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, connectorsForWallets, wallet, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.localhost
  ],
  [
    publicProvider()
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: ' ',
    wallets: [
      wallet.metaMask({ chains }),
    ],
  },
]);


const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        showRecentTransactions={true}
        chains={chains} 
        modalSize="compact" 
        theme={darkTheme({
        accentColor: '#D65A31',
      })}>
        <NavProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NavProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp
