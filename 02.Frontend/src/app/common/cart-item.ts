import { Movie } from './movie';

export class CartItem {
  id  : string;
  name  : string;
  imageUrl : string;
  unitPrice : number;
  quantity : number;
  constructor(tempMovies : Movie)
  {
    this.id = tempMovies.id;
    this.name = tempMovies.name;
    this.imageUrl = tempMovies.imageUrl;
    this.unitPrice = tempMovies.unitPrice;
    this.quantity = 1;

  }
}
