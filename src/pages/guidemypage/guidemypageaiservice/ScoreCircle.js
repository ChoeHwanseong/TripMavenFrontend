import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function ScoreCircle({ score }) {
  const settings = {
    width: 200,
    height: 200,
    value: score,
    min: 0,
    max: 100,
  };

  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#0066ff',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
        [`& .${gaugeClasses.root}`]: {
          strokeLinecap: 'round',
        },
      })}
    />
  );
}