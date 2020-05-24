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
  get(id: number) {
    throw new Error("Method not implemented.");
  }

  private baseUrl = "http://localhost:8091/api/movies";
  private categoryUrl ="http://localhost:8091/api/movie-category";
 
  constructor(private httpClient : HttpClient) {}
 
  getMovieList(theCategoryId : number, currentPage : number, pageSize : number) : Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}$size=${pageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  private getMovies(searchUrl: string): Observable<Movie[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response._embedded.movies));
  }

  getMovieCategories() : Observable<MovieCategory[]> {
   return this.httpClient.get<GetResponseMovieCategory>(this.categoryUrl).pipe(
     map(response => response._embedded.movieCategory)
   );
  }

  searchMovies(keyword : string, currentPage : number, pageSize : number) : Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  movieDetails(movieId : number) : Observable<Movie>
  {
    const movieDetailsUrl = `${this.baseUrl}/${movieId}`;
    return this.httpClient.get<Movie>(movieDetailsUrl);
  }
}
 interface GetResponse
 {
    _embedded: {
      movies: Movie[];
    },
    page: {
      //number of records in each page
      size : number,
      //total number of record in datbase
      totalElements : number,
      //total number of pages, start from 0 index
      totalPages : number,
      //current page
      number : number
    }
 }

 interface GetResponseMovieCategory
 {
    _embedded: {
      movieCategory: MovieCategory[];
    }
 }