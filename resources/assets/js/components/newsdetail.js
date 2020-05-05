import React, {Component, Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"
import {Helmet} from "react-helmet"

//コンポーネント
import Loading from './loading'

const NewsDetail = props => {
    const { id } = useParams();
    
    useEffect(() => {
        
        if(props.single.id != id){
            if(!("data" in props.single)){
                const url = domein + restUrl + postsUrl + "/" + id + "?" + postsParameter
                props.getFetch(url, 'single')
            }
        }
        
    });
    
    if("data" in props.single){
        
        return(
            <Fragment>
                <Helmet>
                    <title>404 | CodeCode</title>
                    <meta name="description" content={ props.single.message ? props.single.message : "" } />
                </Helmet>
                
                <div className="error">
                    <h1>{ props.single.message ? props.single.message : "" }</h1>
                    <p>{ props.single.data ? props.single.data.status : "" }</p>
                </div>
            </Fragment>
        )
        
    }else{
        
        return(
            <Fragment>
                <Helmet>
                    <title>{props.single.title ? props.single.title.rendered : "CodeCode"} | CodeCode</title>
                    <meta name="description" content={props.single.title ? props.single.title.rendered : ""} />
                </Helmet>
                
                <div className="news_single">
                    <h1 className="news_title" dangerouslySetInnerHTML={{ __html: props.single.title ? props.single.title.rendered : "" }}></h1>

                    <p className="date"><time dateTime={ props.single.date ? props.single.date : "" }>{ makeDate(props.single.date ? props.single.date : "") }</time></p>

                    <div className="news_details" dangerouslySetInnerHTML={{ __html: props.single.content ? props.single.content.rendered : "" }}></div>

                    <p className="back"><Link to="/">&lt; archive</Link></p>

                </div>
            </Fragment>
        )
        
    }

}

export default NewsDetail