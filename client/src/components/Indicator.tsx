import React from 'react';

interface IndicatorProps {
  indicator: 'left' | 'right' | null;
}

const Indicator: React.FC<IndicatorProps> = ({ indicator }) =>
  indicator ? <div className={`indicator ${indicator}`}></div> : null;

export default Indicator;
