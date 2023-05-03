export default interface Ticket {
  id: string;
  isSpecial: boolean;
  expireDate: Date;
  titles: string[];
  type: string;
  price: number;
}
