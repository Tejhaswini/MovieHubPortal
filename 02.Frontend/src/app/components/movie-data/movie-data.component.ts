import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/common/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data-grid.component.html',
  styleUrls: ['./movie-data.component.css']
})
export class MovieDataComponent implements OnInit {

  movies: Movie[];
  currentCategoryId : number;
  constructor(private movieService: MovieService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit()
  {
    this.activatedRoute.paramMap.subscribe(()=>
    {
      this.listMovies();
    })
    console.log(this.listMovies());
  }
  listMovies()
   {
     const hasCategoryId : boolean = this.activatedRoute.snapshot.paramMap.has('id');
     if(hasCategoryId){
       this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
     }
     else{
       this.currentCategoryId = 1;
     }
     this.movieService.getMovieList(this.currentCategoryId).subscribe(
       data => {
         this.movies = data;
         console.log(this.movies);
       }
     )
   }

}







