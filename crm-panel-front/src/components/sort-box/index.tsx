import * as React from "react";
import { useTranslation } from "react-i18next";

export interface ISortBoxProps {
  onChange?: (value: string) => void;
  value?: string;
  count?: number;
}

export default function SortBox({ onChange, value, count }: ISortBoxProps) {
  const { t } = useTranslation();

  return (
    <div className="bgc-default-l4 radius-1 p-25 border-1 brc-default-l3 mb-1">
      <div className="d-flex flex-column flex-sm-row">
        {count && (
          <h3 className="text-dark-tp3 text-125 mb-0 ml-sm-2">
            <span className="text-primary-d4 text-115">{count}</span>
            {t("SortBox.ResultsFound")}
          </h3>
        )}
        <div className="ml-auto mt-2 mt-sm-0">
          <label className="mb-0 d-inline-block text-sm">
            {t("SortBox.SortBy")}:
          </label>
          <div className="ml-2 d-inline-block">
            <select
              onChange={(e) => onChange && onChange(e.target.value)}
              value={value}
              className="ace-select brc-blue-m4 brc-h-blue-m1 text-90 h-auto border-1"
              style={{ paddingLeft: "3rem" }}
            >
              <option value="newest">{t("SortBox.Newest")}</option>
              <option value="grandest">{t("SortBox.Grandest")}</option>
              <option value="cheapest">{t("SortBox.Cheapest")}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
