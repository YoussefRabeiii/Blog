import React from 'react'
import { Link } from "react-router-dom"

import Markdown from 'react-markdown'
import postList from "../../posts.json"

import "./style.css"

const PostList = () => {
    const first20 = postList.map(post => {
        return post.content.split(" ").slice(0, 20).join(" ");
    })

    return (
        <div className="postList">
            <h1 className="title">All Posts</h1>
            {postList.length  &&
                postList.map((post, i) => {
                    return (
                        <div className="postCard" key={i}>  {/* NEED: uuid */}
                            <h1><Link className="links" to={`/post/${post.id}`}>{post.title}</Link></h1>
                            <h5>Published on {post.date} by {post.author}</h5>
                            
                            <hr/>

                            <Markdown source={first20[i]} escapeHtml={false} />
                            <br/>

                            <h5><Link className="links" to={`/post/${post.id}`}>Read More</Link></h5>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PostList
