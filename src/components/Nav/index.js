import React from 'react'

import { Link } from "react-router-dom"

import "./style.css"

const Nav = () => {
    return (
        <div className="nav">
            <Link className="links" to="/">Home</Link>
            <Link className="links" to="/about">About</Link>
        </div>
    )
}

export default Nav
