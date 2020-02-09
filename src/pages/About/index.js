import React from "react"

import Markdown  from "react-markdown"
import aboutText from "../../pages.json"
import Layout from "../../components/Layout"

import "./style.css"

const About = () => {
    return (
        <Layout>
            <div className="about">
                <h1>This is the About Page</h1>
                <br/>
                <div className="aboutContent">
                    <Markdown source={aboutText[0].content} escapeHtml={false} />
                </div>
            </div>
        </Layout>
    )
}

export default About
