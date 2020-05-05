import React, {Component, useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"

//コンポーネント
import Loading from './loading'

const NewsDetail = props => {
    
    const [detail, setDetail] = useState({});
    const { id } = useParams();
    const pageId = id.length <= 5 ? "/" + id : "/000"
    
    useEffect(() => {
        
        if(!Object.keys(detail).length){
            const url = domein + restUrl + postsUrl + pageId + "?" + postsParameter
            fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                setDetail(responseData)
            })
            .catch((error)=>{
                //fetch自体が失敗したとき
                console.log("取得に失敗しました。: " + error);
            })
        }
        
    });
    
    //記事情報がロードできているかどうか
    if(!Object.keys(detail).length){
        return(
            <Loading />
        )
    }else{
        
        if("data" in detail){
            
            return(
                <div className="error">
                    <h1>{ detail.message }</h1>
                    <p>{ detail.data.status }</p>
                </div>
            )
            
        }else{
            
            return(
                <div className="news_single">
                    <h1 className="news_title" dangerouslySetInnerHTML={{ __html: detail.excerpt.rendered }}></h1>

                    <p className="date"><time dateTime={ detail.date }>{ makeDate(detail.date) }</time></p>

                    <div className="news_details" dangerouslySetInnerHTML={{ __html: detail.content.rendered }}></div>

                    <p className="back"><Link to="/">&lt; archive</Link></p>

                </div>
            )
            
        }
    }

}

export default NewsDetail