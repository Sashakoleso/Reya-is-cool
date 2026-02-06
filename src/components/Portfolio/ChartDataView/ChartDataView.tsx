/* eslint-disable @typescript-eslint/no-explicit-any */
import {FC, useEffect, useState} from 'react';
import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from 'recharts';
import {usePositionCalculations} from '../../../hooks/usePositionCalculations';
import {useWalletStore} from '../../../store/walletStore';
import {useMarketsStore} from '../../../store/marketsStore';
import {reyaApi} from '../../../services/api/reyaApi';
import {formatUSD, getSymbolDisplayName} from '../../../utils/formatters';
import {vars} from '../../../styles/theme.css';
import * as styles from './ChartDataView.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value} = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 20) * cos;
  const sy = cy + (outerRadius + 20) * sin;
  const mx = cx + (outerRadius + 60) * cos;
  const my = cy + (outerRadius + 60) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1);
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (<g>
    <text x={cx} y={cy} dy={8} textAnchor="middle" fill={vars.colors.text} style={{fontSize: vars.fontSize.xxl}}>
      {payload.name}
    </text>
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
    <Sector
      cx={cx}
      cy={cy}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={outerRadius + 12}
      outerRadius={outerRadius + 15}
      fill={fill}
    />
    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2}/>
    <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none"/>
    <text x={ex + (cos >= 0 ? 1 : -1) * 24} y={ey} textAnchor={textAnchor} fill={vars.colors.text}
          style={{fontSize: vars.fontSize.xl}}>{formatUSD(value)}</text>
    <text x={ex + (cos >= 0 ? 1 : -1) * 24} y={ey} dy={28} textAnchor={textAnchor} fill={vars.colors.textSecondary}
          style={{fontSize: vars.fontSize.lg}}>
      {`(${(percent * 100).toFixed(2)}%)`}
    </text>
  </g>);
};

export const ChartDataView: FC = () => {
  const positions = usePositionCalculations();
  const walletAddress = useWalletStore.useWalletAddress();
  const setMarkets = useMarketsStore.useSetMarkets();
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!walletAddress) return;

    const refreshMarkets = async () => {
      try {
        const newMarkets = await reyaApi.getMarketDefinitions();
        setMarkets(newMarkets);
      } catch (error) {
        console.error('Failed to refresh markets:', error);
      }
    };

    // Markets don't change often, but we can refresh them periodically too
    refreshMarkets();
    const interval = setInterval(refreshMarkets, 30000);

    return () => clearInterval(interval);
  }, [walletAddress, setMarkets]);

  const data = positions
    .map(pos => ({
      name: getSymbolDisplayName(pos.symbol), value: Math.abs(Number(pos.positionValue))
    }))
    .filter(item => item.value > 0);

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const getChartConfig = () => {
    if (screenWidth < 1200) {
      return {inner: 50, outer: 100, height: 600};
    }
    if (screenWidth < 1380) {
      return {inner: 80, outer: 250, height: 600};
    }
    return {inner: 150, outer: 300, height: 800};
  };

  const config = getChartConfig();

  return (<div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>Chart data</h2>
    </div>

    {data.length > 0 ? (<div className={styles.chartContainer}>
      <div className={styles.totalValueWrapper}>
        <div className={styles.totalValueLabel}>Total Position Value</div>
        <div className={styles.totalValueAmount}>{formatUSD(totalValue)}</div>
      </div>

      <ResponsiveContainer width="100%" height={config.height}>
        <PieChart>
          <Pie
            {...{
              activeIndex, activeShape: renderActiveShape,
            } as any}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={config.inner}
            outerRadius={config.outer}
            paddingAngle={0}
            cornerRadius={0}
            minAngle={0}
            startAngle={0}
            endAngle={360}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            isAnimationActive={false}
          >
            {data.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>) : (<div className={styles.placeholder}>
      No position data available to display the chart.
    </div>)}
  </div>);
};
