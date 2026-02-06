import {FC} from "react";
import {useWalletPositions} from '../../../hooks/useWalletPositions';
import {usePriceUpdates} from '../../../hooks/usePriceUpdates';
import {useWalletStore} from '../../../store/walletStore';
import {PositionsTable} from '../PositionsTable/PositionsTable';
import {ChartDataView} from '../ChartDataView/ChartDataView';
import * as styles from './PortfolioPage.css';

export const PortfolioPage: FC = () => {
  const isWalletAddressValid = useWalletStore.useIsWalletAddressValid();
  const activeTab = useWalletStore.useActiveTab();
  useWalletPositions();
  usePriceUpdates();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {isWalletAddressValid && (
          activeTab === 'portfolio' ? <PositionsTable/> : <ChartDataView/>
        )}
      </div>
    </div>
  );
};
