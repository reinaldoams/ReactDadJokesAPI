import { Component } from 'react'
import Joke from './Joke'
import './styles.css'

export default class JokeList extends Component {
    constructor(props){
        super(props)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate() {
        console.log('here')
        window.localStorage.clear();
        this.props.updateJokes()
    }

  render() {
    return (
      <div className='JokeList'>
          {this.props.jokes.map(joke => (
              <Joke joke={joke.joke} id={joke.id} key={joke.id} />
          ))}
          <button onClick={this.handleUpdate} > Update Jokes </button>
      </div>
    )
  }
}
