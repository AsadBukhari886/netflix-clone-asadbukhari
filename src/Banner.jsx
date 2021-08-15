import React, { useState, useEffect } from 'react';
import axios from './axios';
import request from './request.js';

const base_url = 'https://image.tmdb.org/t/p/original/'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const respond = await axios.get(request.fetchNetflixOriginals)
            // console.log(respond.data.results.length)
            // console.log(Math.floor(Math.random() * respond.data.results.length - 1))

            setMovie(respond.data.results[
                Math.floor(Math.random() * respond.data.results.length - 1)
            ]);

            // return respond
            // console.log("movie is here", movie?.overview.length)
        }
        fetchData();
    }, [])

    

    //function 1
   function truncate(str,n){
       return str?.length > n ? str.substring(0, n-1)+`...` : str;}
     
    
    


    return (
        <header className="banner"
            style={{
                backgroundPosition: "center center",
                backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
                backgroundSize: "cover",
              height:'500px'
            }}>
            <div className="banner_contents">
                <div className="banner_title">
                    <p>{movie?.title || movie?.name || movie?.original_name}</p>
                </div>
                {/* <div className="banner_buttons">
                    <button className="banner_button">play</button>
                    <button className="banner_button">My List</button>
                </div> */}

                <div className="banner_buttons" >
            <div className="col-md-3 col-sm-3 col-xs-6"> <a href="#" className="btn btn-sm animated-button sandy-one">play</a> </div>
            <div className="col-md-3 col-sm-3 col-xs-6"> <a href="#" className="btn btn-sm animated-button sandy-two">My List</a> </div>
           
          </div>

                <div className="banner_description">
                    {truncate(movie?.overview,300)}
                   
                </div>

            </div>
<div className="banner_fadebutton"></div>
        </header>
    )
}

export default Banner
