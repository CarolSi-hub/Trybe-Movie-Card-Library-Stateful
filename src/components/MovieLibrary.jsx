/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

export default class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.addNewMovie = this.addNewMovie.bind(this);

    const { movies } = this.props;
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  handleEvent({ target }) {
    const { name } = target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;
    this.setState({ [name]: value });
  }

  filterMovies() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    if (bookmarkedOnly) return movies.filter((movie) => movie.bookmarked === true);
    if (selectedGenre !== '') return movies.filter((movie) => movie.genre === selectedGenre);
    if (searchText !== '') {
      return movies.filter((movie) => movie.title.includes(searchText)
        || movie.subtitle.includes(searchText)
        || movie.storyline.includes(searchText));
    }
    return movies;
  }

  addNewMovie(movie) {
    this.setState(({ movies }) => ({ movies: [...movies, movie] }));
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <div>
        <div>
          <SearchBar
            searchText={searchText}
            onSearchTextChange={this.handleEvent}
            bookmarkedOnly={bookmarkedOnly}
            onBookmarkedChange={this.handleEvent}
            selectedGenre={selectedGenre}
            onSelectedGenreChange={this.handleEvent}
          />
        </div>
        <div>
          <MovieList movies={this.filterMovies()} />
        </div>
        <div>
          <AddMovie onClick={this.addNewMovie} />
        </div>
      </div>
    );
  }
}

MovieLibrary.propTypes = { movies: PropTypes.arrayOf(PropTypes.object).isRequired };
