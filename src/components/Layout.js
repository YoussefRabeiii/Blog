import React from 'react'

import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"

import "./style.css"

import "./Header/style.css"
import "./Footer/style.css"

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <Nav />
            <div>{ children }</div>
            <Footer />
        </div>
    )
}

export default Layout
