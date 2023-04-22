import React from 'react';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as theme from '../constants/Dashboard/theme';

const MyLineChart = () => (
  <LineChart
              yMax={100}
              yMin={0}
              data={[0, 20, 25, 15, 20, 55, 10]}
              style={{ flex: 0.8 }}
              curve={shape.curveNatural}
              svg={{ stroke: theme.colors.accent, strokeWidth: 3 }}
            />
);

export default MyLineChart;
