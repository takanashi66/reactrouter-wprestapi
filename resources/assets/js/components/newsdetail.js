import React, {Component, Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams, withRouter } from "react-router-dom"
import {Helmet} from "react-helmet"

//コンポーネント
import Loading from './loading'

//設定をインポート
import config from '../config.json'
//関数をインポート
import { makeDate } from '../functions'

const NewsDetail = props => {
    const { id } = useParams();
    
    useEffect(() => {
        
        if(props.single.id != id && !("data" in props.single)){
            const url = config.domein + config.restUrl + config.postsUrl + "/" + id + "?" + config.postsParameter
            props.getFetch(url, 'single')
        }
        
    });
    
    const onClickReturnList = ()=>{
        const url = config.domein + config.restUrl + config.postsUrl + "?" + config.postsParameter + "&" + config.perPage + config.perPageNum + "&" + config.page + props.currentPage
        props.getFetch(url, 'data')
        props.history.push("/")
    }
    
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
                    <p className="back"><a onClick={onClickReturnList}>&lt; archive</a></p>
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

                    <p className="back"><a onClick={onClickReturnList}>&lt; archive</a></p>

                </div>
            </Fragment>
        )
        
    }

}

export default withRouter(NewsDetail)