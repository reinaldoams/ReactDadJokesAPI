import React, { Component } from 'react'

export default class Joke extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: (window.localStorage.getItem(`joke${this.props.id}rating`) || 5)
        }
        this.handleRatingDecrease = this.handleRatingDecrease.bind(this)
        this.handleRatingIncrease = this.handleRatingIncrease.bind(this)
    }

    handleRatingIncrease() {
        const rating = parseInt(this.state.rating)
        if (rating < 10){
        window.localStorage.setItem(`joke${this.props.id}rating`, parseInt(rating) + 1)
        this.setState(state => {
            return { rating: window.localStorage.getItem(`joke${this.props.id}rating`) }
        })
    }
    }

    handleRatingDecrease() {
        const rating = parseInt(this.state.rating)
        if (rating > 1){
        window.localStorage.setItem(`joke${this.props.id}rating`, parseInt(rating) - 1)
        this.setState(state => {
            return { rating: window.localStorage.getItem(`joke${this.props.id}rating`) }
        })
    }
    }

    render() {
        const emojiClasses = [
            'fa-regular fa-face-tired',
            'fa-regular fa-face-angry',
            'fa-regular fa-face-rolling-eyes',
            'fa-regular fa-face-meh',
            'fa-regular fa-face-grimace',
            'fa-regular fa-smile',
            'fa-regular fa-face-grin-beam',
            'fa-regular fa-face-grin-squint',
            'fa-regular fa-face-grin-tears',
            'fa-regular fa-face-grin-squint-tears'
        ]
        return (
            <div className='Joke'>

                <div className='rating'>{this.state.rating}</div>
                <i className={emojiClasses[this.state.rating -1]}></i>
                <div>{this.props.joke}</div>
                <button onClick={this.handleRatingIncrease}>+</button>
                <button onClick={this.handleRatingDecrease}>-</button>
            </div>
        )
    }
}