import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import {Movie} from 'src/app/common/Movie';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie : Movie = new Movie();
  constructor(private activatedRoute : ActivatedRoute,
    private movieService : MovieService,private cartService : CartService) { }

  ngOnInit()
  {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.getMovieInfo();
      }
    )
  }

   getMovieInfo()
   {
     const id : number = +this.activatedRoute.snapshot.paramMap.get('id');
     console.log("Hey",id);
     this.movieService.movieDetails(id).subscribe(
      data =>
      {
        this.movie = data;
      }
     );
   }

   addToCart(){
     const cartItem = new CartItem(this.movie);
     this.cartService.addToCart(cartItem);
   }
}
