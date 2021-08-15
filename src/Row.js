import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
// import {useSearchParam} from 'react-use';
import movieTrailer from 'movie-trailer'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Row({ title, fetchURL, isLargeRow }) {
    const [movie, setMovie] = useState([])
    const [trailerURL, setTrailerURL] = useState("")

    useEffect(() => {
        async function fetchData() {
            const respond = await axios.get(fetchURL)
            //    console.log(respond.data)
            //    console.log(respond.data.results[0].backdrop_path)
            setMovie(respond.data.results)
            return respond
        }
        fetchData();
    }, [fetchURL])

    const opt = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }



    const POPUP = (e, movie) => {
        e.preventDefault();
        if (trailerURL) {
            setTrailerURL("");
        } else {
            movieTrailer(movie?.name || movie.title)
                .then((url) => {
                    // console.log(url)
                    const param = new URL(url).search;
                    // console.log("URL searin",param.href)

                    console.log("param is ::", param,"gfxM")
                    const useParam = new URLSearchParams(param)
                    // console.log("useParam is here:", useParam.get("v"))
                    setTrailerURL(useParam.getAll("v"))
                    // (url)
                })

                .catch(error => console.log(error))

        }
        
        // <a href="#youtube"/>

        // alert(movie.name || movie.title || movie.original_name)
    }
    // const SRC = 'src';
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className='row_posters '>
                {movie?.map((movie) =>
                (<>
                    <img key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        className={`row_poster ${isLargeRow && "row_posterLarger"}`}
                        onClick={(e) => POPUP(e, movie)
                        }
 />

                </>)
                    //    console.log(movie.poster_path),

                )}
            </div>
            <div className="youtube" >
                {trailerURL && <Youtube videoId={trailerURL}
                    opt={opt} className="youtube_class"></Youtube>
                }
            </div>
            <div id="youtube"></div>

        </div>
    )
}

export default Row
