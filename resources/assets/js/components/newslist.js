import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const NewsList = props => {
    console.log(props.maxPage);
    return(
        <Fragment>
            { props.data.map(item =>{
                
                return(
                    <div className="news_item" key={ item.id }>
                        <div className="news_excerpt">
                            <p className="date"><time dateTime={ item.date }>{ makeDate(item.date) }</time></p>
                            <h1 dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}></h1>
                            <p className="more"><Link to={ "/" + item.id }>read more</Link></p>
                        </div>
                    </div>
                )
            }) }
            
            {(() => {
                if(props.maxPage > 0){
                    const items = [];
                    for (let i = 1; i<=props.maxPage; i++) {
                        if(i == props.currentPage){
                            items.push(<li key={i} data-index={i} className="current" onClick={props.onClickPageNation}>{i}</li>)
                        }else{
                            items.push(<li key={i} data-index={i} onClick={props.onClickPageNation}>{i}</li>)
                        }
                    }
                    return <ul className="pagenation">{items}</ul>;
                }
            })()}
            
        </Fragment>
    )

}

export default NewsList