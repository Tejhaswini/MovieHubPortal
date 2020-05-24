import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/common/movie';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data-grid.component.html',
  styleUrls: ['./movie-data.component.css']
})
export class MovieDataComponent implements OnInit {

  movies: Movie[] = [];
  currentCategoryId : number = 1;
  searchMode : boolean = false;
  previousCategory : number = 1;

  //new properties for server side paging 
  currentPage : number = 1;
  pageSize : number = 5;
  totalRecords: number = 0;

  constructor(private movieService: MovieService,
    private activatedRoute : ActivatedRoute, private cartService : CartService, config : NgbPaginationConfig) {
      config.maxSize = 3;
     }

  ngOnInit()
  {
    this.activatedRoute.paramMap.subscribe(()=>
    {
      this.listMovies();
    })
    console.log(this.listMovies());
  }

  updatePageSize(pageSize : number)
  {
   this.pageSize = pageSize;
   this.currentPage = 1;
   this.listMovies();
  }
  listMovies()
   {
     //starts the spinner
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    if(this.searchMode)
    {
      //do search work
      this.handleSearchMovies();
    }
    else{
      //display movies based on category
      this.handleListMovies();
    }
   }

   handleListMovies()
   {
    const hasCategoryId : boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId = 1;
    }
    
    //setting up the current page to 1 
    //if yser navigates to other category
    if(this.previousCategory != this.currentCategoryId)
    {
      this.currentPage = 1;
    }
    this.previousCategory = this.currentCategoryId;

    this.movieService.getMovieList(this.currentCategoryId,
                                   this.currentPage - 1,
                                   this.pageSize)
                                   .subscribe(this.processPaginate());
    }
   handleSearchMovies()
   {
     const keyword : string = this.activatedRoute.snapshot.paramMap.get('keyword');
     this.movieService.searchMovies(keyword,this.currentPage - 1,this.pageSize).subscribe(this.processPaginate());
   }

   processPaginate()
   {
     return data => {
       //stops the loader/spinner
       this.movies = data._embedded.movies;
       //page number starts from 1 index
       this.currentPage = data.page.number + 1;
       this.totalRecords = data.page.totalElements;
       this.pageSize = data.page.size;
     }
    }
    addToCart(tempMovies : Movie)
    {
      console.log(`movie name: ${tempMovies.name}, and price: ${tempMovies.unitPrice}`);
      const cartItem = new CartItem(tempMovies);
      this.cartService.addToCart(cartItem);
    }

  }






