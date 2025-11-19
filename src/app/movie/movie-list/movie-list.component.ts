import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { moviesData } from '../moviesData';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  ngOnInit() {
    this.getMovies();
  }

  navigateToDetail(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
