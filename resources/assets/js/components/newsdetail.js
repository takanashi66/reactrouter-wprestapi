import React, {Component, useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"

//コンポーネント
import Loading from './loading'

const NewsDetail = props => {
    const { id } = useParams();
    
    useEffect(() => {
        console.log(!"data" in props.single);
        if(props.single.id != id){
            if(!("data" in props.single)){
                const url = domein + restUrl + postsUrl + "/" + id + "?" + postsParameter
                props.getFetch(url, 'single')
            }
        }
        
    });
    
    if("data" in props.single){
        
        return(
            <div className="error">
                <h1>{ props.single.message ? props.single.message : "" }</h1>
                <p>{ props.single.data ? props.single.data.status : "" }</p>
            </div>
        )
        
    }else{
        
        return(
            <div className="news_single">
                <h1 className="news_title" dangerouslySetInnerHTML={{ __html: props.single.excerpt ? props.single.excerpt.rendered : "" }}></h1>

                <p className="date"><time dateTime={ props.single.date ? props.single.date : "" }>{ makeDate(props.single.date ? props.single.date : "") }</time></p>

                <div className="news_details" dangerouslySetInnerHTML={{ __html: props.single.content ? props.single.content.rendered : "" }}></div>

                <p className="back"><Link to="/123456">&lt; archive</Link></p>

            </div>
        )
        
    }

}

export default NewsDetail