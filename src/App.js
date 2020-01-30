import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.fetchMovie()
  }

  // fetch data from endpoint using fetch
  fetchMovie(title) {
    
    if (title === "") {
      this.setState({
        rows: []
      })
      return
    }

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=68ef98a4affa652b311088086fb922db&query=${title}`).then(res => res.json()).then(data => {
        const results = data.results
        this.updateResults(results)
      }).catch(console.log)
    }

    // fetch data from endpoint 
    // using jquery
    fetchMovieWithJQuery(title) {
      if (title === "") {
        this.setState({
          rows: []
        })
        return
      }
      const URLString = `https://api.themoviedb.org/3/search/movie?api_key=68ef98a4affa652b311088086fb922db&query=${title}`

      $.ajax({
        url: URLString,
        success: (searchResults) => {
          console.log('Fetched data successfully')
          const results = searchResults.results
          this.updateResults(results)
        },
        error: (xhr, status, error) => {
          console.error("Failed to fetch data")
        }
      })
    }

    updateResults(results) {
      var rows = []

      results.forEach(result => {
        result.poster_src = "https://image.tmdb.org/t/p/w300/" + result.poster_path
        const movieRow = <MovieRow key={result.id} movie={result} />
        rows.push(movieRow)
      })

      this.setState({
        rows: rows
      })
    }

    render() {
      return (
        <div className="App">

          {/* header */}

          <table className="titleBar">
            <tbody>
              <tr>
                <td>
                  <img alt="app icon" width="50" src="green_app_icon.svg" />
                </td>
                <td width="8" />
                <td>
                  <h2> MoviesDB Search </h2>
                </td>

              </tr>
            </tbody>
          </table>

          {/* input bar */}

          <input style={{
            fontSize: 24,
            display: 'block',
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
          }} placeholder="Enter movie name" onChange={event => this.inputChanged(event)} />

          {this.state.rows}

        </div>
      );
    }
    inputChanged(event) {
      this.fetchMovie(event.target.value)
    }

  }

  export default App;
