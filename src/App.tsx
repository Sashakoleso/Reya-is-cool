import {Sidebar} from './components/Sidebar/Sidebar';
import {Header} from './components/Header/Header';
import {PortfolioPage} from './components/Portfolio/PortfolioPage/PortfolioPage';
import {useMarkets} from './hooks/useMarkets';
import {useIsMobile} from './hooks/useIsMobile';
import * as styles from './App.css';
import './styles/global.css';
import {Footer} from "./components/Footer/Footer.tsx";
import {MobileBlocking} from "./components/MobileBlocking/MobileBlocking";
import {useWalletStore} from "./store/walletStore.ts";

export const App = () => {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileBlocking/>;
  return <AppContent/>;
};

const AppContent = () => {
  const isWalletAddressValid = useWalletStore.useIsWalletAddressValid()
  useMarkets();

  return (
    <div className={styles.app}>
      <Header/>
      <div className={styles.content}>
        <Sidebar/>
        {isWalletAddressValid && <div className={styles.main}>
          <PortfolioPage/>
        </div>}
      </div>
      <Footer/>
    </div>
  );
};