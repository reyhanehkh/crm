import React from "react";
export interface PersianDateColumnProps {
  value: number;
}

function PersianDateColumn({ value }: PersianDateColumnProps) {
  return <>{value}</>;
}

export default PersianDateColumn;
