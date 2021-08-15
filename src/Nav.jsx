import React, { useState, useEffect } from 'react';
import netflix_tranparent from './netflix_tranparent.png';
import avatar from './avatar.png';
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    // useEffect (  () => {
    //     wnidow.addEventListener('scroll', function (e) {

    //         if (window.scrollY > 100) {
    //             handleShow(true);
    //         }
    //         //   );
    // } ))

    useEffect(() => {

        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                handleShow(true)
            } else { handleShow(false) }
        })
        return () => {
            window.removeEventListener("scroll", function () {
                if (window.scrollY > 100) {
                    handleShow(true)
                } else { handleShow(false) }
            })
        }

    })
    return (
        <nav className={`navbar ${show && 'nav_black'} `}>
            <img src={netflix_tranparent} className="nav_logo" alt="navbar" />
            <img src={avatar} className="nav_avatar" />
        </nav>
    )
}

// }

export default Nav
