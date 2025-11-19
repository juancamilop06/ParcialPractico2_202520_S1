import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  averagePopularity: number = 0;
  durationFormatted: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  calculateAveragePopularity(): void {
    if (this.movie && this.movie.cast && this.movie.cast.length > 0) {
      const total = this.movie.cast.reduce((sum, actor) => sum + actor.popularity, 0);
      this.averagePopularity = total / this.movie.cast.length;
    }
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}H y ${mins}m`;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(Number(id)).subscribe((movie) => {
        this.movie = movie;
        this.calculateAveragePopularity();
        this.durationFormatted = this.formatDuration(movie.duration);
      });
    }
  }

}
