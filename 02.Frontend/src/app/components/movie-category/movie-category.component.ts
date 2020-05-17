import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieCategory } from 'src/app/common/movie-category';

@Component({
  selector: 'app-movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.css']
})
export class MovieCategoryComponent implements OnInit {

  movieCategories : MovieCategory[];
  constructor(private movieService : MovieService) 
  {

  }
  ngOnInit()
  {
  this.listMovieCategories();
  }

  listMovieCategories()
  {
  this.movieService.getMovieCategories().subscribe(
  data => this.movieCategories = data
  );
  }
}
