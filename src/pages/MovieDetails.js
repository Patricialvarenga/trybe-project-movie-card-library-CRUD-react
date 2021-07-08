import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      movie: {},
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  // Consegui utilizar o match e o params através de dúvidas postadas no slack do Julio Barros e
  // do Stefano Oliveira
  async handleDelete() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    await movieAPI.deleteMovie(id);
  }

  async fetchMovie() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await movieAPI.getMovie(id);
    this.setState({
      loading: false,
      movie: response,
    });
  }

  render() {
    const { movie, loading } = this.state;
    if (loading) return <Loading />;

    const { title, storyline, imagePath, genre, rating, subtitle, id } = movie;

    return (
      <div data-testid="movie-details">
        <h1>{ title }</h1>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={ this.handleDelete }>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default MovieDetails;
