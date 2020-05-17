import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Movie } from '../common/movie';
import { MovieCategory } from '../common/movie-category';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = "http://localhost:8091/api/movies";
  private categoryUrl ="http://localhost:8091/api/movie-category";
  constructor(private httpClient : HttpClient) {}
  getMovieList(theCategoryId : number) : Observable<Movie[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
   return this.httpClient.get<GetResponse>(searchUrl).pipe(
     map(response => response._embedded.movies)
   );
  }

  getMovieCategories() : Observable<MovieCategory[]> {
   return this.httpClient.get<GetResponseMovieCategory>(this.categoryUrl).pipe(
     map(response => response._embedded.movieCategory)
   );
  }
}
 interface GetResponse
 {
    _embedded: {
      movies: Movie[];
    }
 }

 interface GetResponseMovieCategory
 {
    _embedded: {
      movieCategory: MovieCategory[];
    }
 }