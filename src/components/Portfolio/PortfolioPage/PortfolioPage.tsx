import {FC} from "react";
import {useWalletPositions} from '../../../hooks/useWalletPositions';
import {usePriceUpdates} from '../../../hooks/usePriceUpdates';
import {useWalletStore} from '../../../store/walletStore';
import {WalletInput} from '../WalletInput/WalletInput';
import {PositionsTable} from '../PositionsTable/PositionsTable';
import * as styles from './PortfolioPage.css';

export const PortfolioPage: FC = () => {
  const isWalletAddressValid = useWalletStore.isWalletAddressValid();
  useWalletPositions();
  usePriceUpdates();

  return (

    <div className={styles.page}>
    <div className={styles.content}>
      <WalletInput/>
      {isWalletAddressValid && <PositionsTable/>}
    </div>
  </div>
  );
}