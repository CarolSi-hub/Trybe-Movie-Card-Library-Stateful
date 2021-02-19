import React from 'react';
import PropTypes from 'prop-types';

export default class AddMovie extends React.Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleEvent(event) {
    const { name, value } = event.target;
    const targetValue = (name !== 'rating') ? value : Number(value);
    this.setState({ [name]: targetValue });
  }

  addNewMovie(props) {
    props(this.state);
    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  render() {
    const { onClick } = this.props;
    const { subtitle, title, imagePath, storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form" className="addMovie-field">
        <div>
          <label data-testid="title-input-label" htmlFor="title-input">
            Título
            <input
              data-testid="title-input"
              type="text"
              name="title"
              id="title-input"
              value={title}
              onChange={this.handleEvent}
              className="addMovie-item"
            />
          </label>
        </div>
        <div>
          <label data-testid="subtitle-input-label" htmlFor="subtitle-input">
            Subtítulo
            <input
              data-testid="subtitle-input"
              type="text"
              name="subtitle"
              id="subtitle-input"
              value={subtitle}
              onChange={this.handleEvent}
              className="addMovie-item"
            />
          </label>
        </div>
        <div>
          <label data-testid="image-input-label" htmlFor="image">
            Imagem
            <input
              data-testid="image-input"
              type="text"
              name="imagePath"
              id="image"
              value={imagePath}
              onChange={this.handleEvent}
              className="addMovie-item"
            />
          </label>
        </div>
        <div>
          <label data-testid="storyline-input-label" htmlFor="storyline-input">
            Sinopse
            <textarea
              data-testid="storyline-input"
              name="storyline"
              id="storyline-input"
              cols="30"
              rows="10"
              value={storyline}
              onChange={this.handleEvent}
              className="addMovie-item"
            />
          </label>
        </div>
        <div>
          <label data-testid="rating-input-label" htmlFor="rating-input">
            Avaliação
            <input
              data-testid="rating-input"
              type="number"
              name="rating"
              id="rating-input"
              value={rating}
              onChange={this.handleEvent}
              className="addMovie-item"
            />
          </label>
        </div>
        <div>
          <label data-testid="genre-input-label" htmlFor="select-input">
            Gênero
            <select
              data-testid="genre-input"
              name="genre"
              id="select-input"
              value={genre}
              onChange={this.handleEvent}
              className="addMovie-item"
            >
              <option data-testid="genre-option" value="action">Ação</option>
              <option data-testid="genre-option" value="comedy">Comédia</option>
              <option data-testid="genre-option" value="thriller">Suspense</option>
            </select>
          </label>
          <button
            data-testid="send-button"
            type="submit"
            className="addMovie-button"
            onClick={(event) => {
              event.preventDefault();
              this.addNewMovie(onClick);
            }}
          >
            Adicionar filme
          </button>
        </div>
      </form>
    );
  }
}

AddMovie.propTypes = { onClick: PropTypes.func.isRequired };
