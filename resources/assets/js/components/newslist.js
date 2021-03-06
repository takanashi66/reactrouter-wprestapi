import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {Helmet} from "react-helmet"

//コンポーネント
import PageNation from './pagenation'

//関数をインポート
import { makeDate } from '../functions'

const NewsList = props => {
    
    return(
        <Fragment>
            <Helmet>
                <title>記事一覧 | CodeCode</title>
                <meta name="description" content="CodeCodeの記事一覧です。" />
            </Helmet>
            
            { props.data.map(item =>{
                
                return(
                    <div className="news_item" key={ item.id }>
                        <div className="news_excerpt">
                            <p className="date"><time dateTime={ item.date }>{ makeDate(item.date) }</time></p>
                            <h1 dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h1>
                            <p className="more"><Link to={ "/" + item.id }>read more</Link></p>
                        </div>
                    </div>
                )
                
            }) }
            
            <PageNation {...props} />
            
        </Fragment>
    )

}

export default NewsList