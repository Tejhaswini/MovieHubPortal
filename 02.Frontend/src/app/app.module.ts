import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDataComponent } from './components/movie-data/movie-data.component';
import { MovieService } from 'src/app/services/movie.service';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovieCategoryComponent } from './components/movie-category/movie-category.component';

const routes : Routes = [
  {path: 'movies', component : MovieDataComponent},
  {path: 'category/:id', component : MovieDataComponent},
  {path : '', redirectTo: '/movies', pathMatch: 'full'},
  {path :'**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieDataComponent,
    PageNotFoundComponent,
    MovieCategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
