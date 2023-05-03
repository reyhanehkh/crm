import { Component } from "react";
import Griddle, { ColumnDefinition, RowDefinition } from "griddle-react";
import styleConfigs from "./style-configs";
import PredefinedComponents from "./predefined-components";

export interface SGridProps {
  columns: (string | string[])[];
  dataProvider: (
    page: number,
    rows: number
  ) => Promise<{ records: number; rows: any[] }>;
}

class SGrid extends Component<SGridProps> {
  state: Readonly<{
    data: any[];
    currentPage: number;
    totalRecords: number;
    pageSize: number;
  }> = { data: [], currentPage: 1, totalRecords: 0, pageSize: 5 };

  changePage = (page: number) => {
    const pageData: { [id: string]: any }[] = [];
    this.props.dataProvider(page, this.state.pageSize).then((data) => {
      data.rows.forEach((item, index) => {
        pageData[index] = {};
        item.cell.forEach((cItem: number, cIndex: number) => {
          let columnIndex = undefined;
          if (typeof this.props.columns[cIndex] === "string")
            columnIndex = this.props.columns[cIndex].toString();
          else if (this.props.columns[cIndex])
            columnIndex = this.props.columns[cIndex][0];
          if (columnIndex) pageData[index][columnIndex] = cItem;
        });
      });
      this.setState({
        data: pageData,
        currentPage: page,
        totalRecords: data.records,
      });
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.changePage(1);
  }

  render() {
    return (
      <Griddle
        data={this.state.data}
        pageProperties={{
          pageSize: this.state.pageSize,
          currentPage: this.state.currentPage,
          recordCount: this.state.totalRecords,
        }}
        styleConfig={styleConfigs}
        events={{
          onNext: () => this.changePage(this.state.currentPage + 1),
          onPrevious: () => this.changePage(this.state.currentPage - 1),
          onGetPage: this.changePage,
        }}
        components={{
          NextButton: ({ className, style, onClick, hasNext }) => (
            <button
              style={style}
              className={className}
              onClick={onClick}
              disabled={!hasNext}
            >
              بعدی
            </button>
          ),
          PreviousButton: ({ className, style, onClick, hasPrevious }) => (
            <button
              style={style}
              className={className}
              onClick={onClick}
              disabled={!hasPrevious}
            >
              قبلی
            </button>
          ),
        }}
      >
        <RowDefinition>
          {this.props.columns.map((value, index) => {
            let component: React.FunctionComponent<any> | undefined = undefined;
            if (Array.isArray(value)) {
              component = PredefinedComponents[value[1].toString()];
              value = value[0];
            }
            return (
              <ColumnDefinition
                id={value}
                title={value}
                customComponent={component}
              />
            );
          })}
        </RowDefinition>
      </Griddle>
    );
  }
}

export default SGrid;
