import {FC, memo} from "react";
import {PositionRow} from '../PositionRow/PositionRow';
import {TableHeader} from './TableHeader';
import {PositionsTableContentProps} from './types';
import * as styles from './PositionsTable.css';

export const PositionsTableContent: FC<PositionsTableContentProps> = memo(({
  positions,
  sortField,
  sortDirection,
  onSort,
}) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <TableHeader sortField={sortField} sortDirection={sortDirection} onSort={onSort}/>
      <tbody>
      {positions.map((position) => (<PositionRow key={position.symbol} position={position}/>))}
      </tbody>
    </table>
  </div>
));
