const API_KEY = '7e78d9d0b80a5a9938ce5aba09bf2c47';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiMovieService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchMovies(url) {
    return fetch(
      `${BASE_URL}${url}?api_key=${API_KEY}&page=${this.page}`,
    )
      .then(response => response.json())
      .then(({ results }) => {
        this.incrementPage();
        return results;
      });
  }

  fetchGenres() {
    return fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(list => {
        return list.genres;
      });
  }

  getGenres(url) {
    return this.fetchMovies(url).then(list => {
      return this.fetchGenres().then(arr =>
        list.map(el => ({
          ...el,
          genre_ids: el.genre_ids.flatMap(num =>
            arr.filter(el => el.id === num),
          ),
        })),
      );
    });
  }

  showResult(url) {
    return this.getGenres(url).then(list => {
      return list.map(el => ({
        ...el,
        release_date: el.release_date.split('-')[0],
      }));
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}