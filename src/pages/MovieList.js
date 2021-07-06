import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
    this.fetchApi = this.fetchApiMovies.bind(this);
  }

  componentDidMount() {
    this.fetchApiMovies();
  }

  // para concluir essa parte consultei o respositório do colega Paula Carlos
  async fetchApiMovies() {
    const response = await movieAPI.getMovies();
    this.setState({
      loading: false,
      movies: response,
    });
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>
    );
  }
}

export default MovieList;
// O raciocínio deste requisito foi construído com respostas de dúvidas no slack: José Carlos, Jossany Moura
