import {FC, memo} from "react";
import {formatNumber, formatUSD, getSymbolDisplayName} from '../../../utils/formatters';
import {PositionRowProps} from './types';
import * as styles from './PositionRow.css';
import {useMarketsStore} from '../../../store/marketsStore';

export const PositionRow: FC<PositionRowProps> = memo(({position}) => {
  const displayName = getSymbolDisplayName(position.symbol);
  const isLong = position.side === 'B';
  const markets = useMarketsStore.markets();
  const market = markets.find((mkt) => mkt.symbol === position.symbol);

  const maxLeverage = market ? `${market.maxLeverage}x` : '';

  return (
    <tr className={styles.row}>
    <td className={styles.marketCell}>
        <span className={isLong ? styles.symbolLong : styles.symbolShort}>
          {displayName}
        </span>
      <span className={`${styles.symbolSuffix} ${isLong ? styles.symbolLong : styles.symbolShort}`}>
          {maxLeverage}
        </span>
    </td>
    <td className={styles.sizeCell}>
      {formatNumber(position.totalQty, 2)}
    </td>
    <td className={styles.valueCell}>
      {formatUSD(position.positionValue)}
    </td>
    <td className={styles.priceCell}>
      {formatNumber(position.markPrice, 2)}
    </td>
  </tr>
  );
});
