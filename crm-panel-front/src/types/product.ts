export default interface Product {
  id: number;
  finalPrice: number;
  mainPrice: number;
  title: string;
  packageTitle: string;
  desc: string;
  specs: ProductSpecs[];
}

export interface ProductSpecs {
  specId: number;
  value: number;
  unit: null | string;
  description: null | string;
}
