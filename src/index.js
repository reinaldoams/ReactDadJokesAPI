import { Component } from 'react';
import ReactDOM from 'react-dom';
import JokeList from './JokeList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || "[]")
        }
        this.getJokesFromAPI = this.getJokesFromAPI.bind(this)
        this.updateJokes = this.updateJokes.bind(this)
    }

    jokes = []

    componentDidMount() {
        this.state.jokes.length === 0 && this.getJokesFromAPI()
    }

    async getJokesFromAPI() {
        while (this.jokes.length < 10) {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json()
            if(this.jokes.every(joke => joke.id !== data.id)){
            this.jokes.push({joke: data.joke, id: data.id})
            this.setState({jokes: this.jokes})
            window.localStorage.setItem('jokes', JSON.stringify(this.jokes))
            } else {
                console.log('Duplicate found, getting another joke')
            }
        }
    }

    updateJokes() {
        this.setState({jokes: []})
        console.log('cleaning jokes...')
        this.jokes = []
        this.getJokesFromAPI()
    }

    render() {
        return (
            <div>
                <JokeList jokes={this.state.jokes} updateJokes={this.updateJokes} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))