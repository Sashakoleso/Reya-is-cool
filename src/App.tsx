import {Sidebar} from './components/Sidebar/Sidebar';
import {Header} from './components/Header/Header';
import {PortfolioPage} from './components/Portfolio/PortfolioPage/PortfolioPage';
import {useMarkets} from './hooks/useMarkets';
import * as styles from './App.css';
import './styles/global.css';
import {Footer} from "./components/Footer/Footer.tsx";

export const App = () => {
  useMarkets();

  return (
    <div className={styles.app}>
      <Header/>
      <div className={styles.content}>
        <Sidebar/>
        <div className={styles.main}>
          <PortfolioPage/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}