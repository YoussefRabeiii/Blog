import React from "react"

import { Redirect } from "react-router-dom"
import Markdown from "react-markdown"

import Layout from "../../components/Layout"
import PostList from "../../posts.json"

import "./style.css"

const Post = (props) => {
    const validId = parseInt(props.match.params.id);

    if (!validId) {
        return <Redirect to="/404" />
    }

    const fetchedPost = {};

    let postExists = false;

    PostList.forEach((post, i) => {
        if (validId === post.id) {
            fetchedPost.title = post.title ? post.title : "No Title Given"
            fetchedPost.date = post.date ? post.date : "No date Given"
            fetchedPost.author = post.author ? post.author : "No author Given"
            fetchedPost.content = post.content ? post.content : "No content Given"
            postExists = true
        }
    })

    if (!postExists) {
        return <Redirect to="/404" />;
    }

    return (
        <Layout>
            <div className="post">
                <h2>{fetchedPost.title}</h2>
                <h4>{`Published on ${fetchedPost.date} by ${fetchedPost.author}`}</h4>
                <hr/>
                <Markdown source={fetchedPost.content} escapeHtml={false} />
            </div>
        </Layout>
    )
}

export default Post
