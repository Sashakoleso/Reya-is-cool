import {FC} from "react";
import {useWalletPositions} from '../../../hooks/useWalletPositions';
import {usePriceUpdates} from '../../../hooks/usePriceUpdates';
import {useWalletStore} from '../../../store/walletStore';
import {PositionsTable} from '../PositionsTable/PositionsTable';
import * as styles from './PortfolioPage.css';

export const PortfolioPage: FC = () => {
  const isWalletAddressValid = useWalletStore.useIsWalletAddressValid();
  useWalletPositions();
  usePriceUpdates();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {isWalletAddressValid && <PositionsTable/>}
      </div>
    </div>
  );
};
