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
    const [hover, setHover] = useState(false);
    const [id, setId] = useState("")

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

    const large_small_row = isLargeRow ? "large" : "small"

    const POPUP = (e, movie) => {
        e.preventDefault();
        if (trailerURL) {
            setTrailerURL("");
        } else {
            movieTrailer(movie?.name || movie?.title)
                .then((url) => {
                    // console.log(url)
                    const param = new URL(url).search;
                    // console.log("URL searin",param.href)

                    console.log("param ::", param, "gfxM")
                    const useParam = new URLSearchParams(param)
                    // console.log("useParam is here:", useParam.get("v"))
                    setTrailerURL(useParam.getAll("v"))
                    // (url)
                })

                .catch(error => console.log(error))

        }
    }


    // const SRC = 'src';
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className='row_posters '>
                {movie?.map((movie, key) =>
                (<>
                    {/* <img key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        onMouseOver={e => (e.currentTarget.src = isLargeRow ? base_url + movie.backdrop_path : base_url + movie.backdrop_path)}
                        onMouseOut={e => e.currentTarget.src = isLargeRow ? base_url + movie.poster_path : base_url + movie.backdrop_path}
                        alt={movie.name}
                        className={`row_poster ${isLargeRow && "row_posterLarger"}`}
                        onClick={(e) => POPUP(e, movie)
                        }
                    /> */}

                    {/* <div>
                        {hover ?
                            <div onMouseOut={() => (console.log('hover down'), setHover(false))} 
                            style={{ border: "2px solid blue", margin: "10px", transition: "all .3s" }}>
                                <div className="hover_true" 
                                style={{ backgroundImage: `url(${base_url}${isLargeRow ?
                                     movie.poster_path : movie.backdrop_path})`, backgroundSize: "100% 100%", width: "200px", height: "100px" }}>

                                </div>
                            </div> :
                            <div onMouseOver={() => (
                                console.log("mouse over"),
                                setHover(true)
                             )} style={{ border: "2px solid blue", margin: "10px", transition: " .3s ease-all-out" }}>
                                <div className="hover_false" style={{ backgroundImage: `url(${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path})`,
                                 backgroundSize: "100% 100%", width: "200px" }}>

                                </div>
                            </div>
                        }
                    </div> */}
                    {/* <div>
                        <div
                            style={{ backgroundImage: `url(${base_url}${isLargeRow?hover ? 
                                movie.poster_path : movie.backdrop_path:movie.back})`, 
                                backgroundSize: "100% 100%", width: "200px", height: "100px", margin: "10px" }}
                            onMouseOver={(e) => (setHover(true), console.log("mouse entered", e.target))}
                            onMouseOut={() => (setHover(false), console.log("mouse down", movie.poster_path))}>

                        </div>
                    </div> */}
                    <div >
                        <div className={`${large_small_row}`}
                            style={{
                                backgroundImage: `
                                url(${base_url}${isLargeRow ?
                                        hover ?
                                            id == movie.id ?
                                                movie.backdrop_path : movie.poster_path
                                            : movie.poster_path
                                        : movie.backdrop_path})`
                            }}
                            onMouseOver={(e) => (setHover(true), setId(movie.id))}
                            onMouseOut={() => (setHover(false))}
                            onClick={(e) => POPUP(e, movie)}
                        >
                            <div className={`${isLargeRow ? "text" : "notext"}`} onMouseEnter={() => (setHover(true))} style={{ transition: ".3s" }}>
                                {hover ? id === movie.id ? <div>
                                    {isLargeRow ? <div> <p> {movie.name ? movie.name || movie.title : 'No movie'}</p>
                                        <button onClick={(e) => POPUP(e, movie)}>watch</button></div> : ""}

                                </div> : <div></div> : <div></div>}

                            </div>
                        </div>


                    </div>


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
