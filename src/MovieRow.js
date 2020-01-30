import React from 'react'

class MovieRow extends React.Component {
    goToWebsite(id) {
        const url = `https://www.themoviedb.org/movie/${id}`
        window.location.href = url
     }

    render() {
        return <table key={this.props.movie.id}>
            <tbody>
                <tr>
                    <td>
                        <img alt="poster" width="100" src={this.props.movie.poster_src} />
                    </td>
                    <td>
                        <h3> {this.props.movie.title} </h3>
                        <p>{this.props.movie.overview}</p>
                        <input type="button" value="view" onClick={event => this.goToWebsite(this.props.movie.id)} />
                    </td>
                </tr>
            </tbody>
        </table>
    }
}

export default MovieRow