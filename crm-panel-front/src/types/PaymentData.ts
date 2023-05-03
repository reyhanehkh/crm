export default interface PaymentData {
  topic: string;
  amountValue: number;
  discount: number;
  taxAmount: number;
  payableAmount: number;
  discountCode?: string | null;
  isAgent: boolean;
  profileInfo: {
    balance: number;
    credit: number;
    creditPay: boolean;
    creditPayable: number;
    depositPay: boolean;
    depositPayable: number;
  };
  errorCode: number;
  errorMessage?: string | null;
}
