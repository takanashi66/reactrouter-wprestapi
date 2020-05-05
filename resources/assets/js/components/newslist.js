import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import PageNation from './pagenation'

const NewsList = props => {
    
    return(
        <Fragment>
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