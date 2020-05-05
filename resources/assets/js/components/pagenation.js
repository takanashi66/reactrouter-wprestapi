import React, {Component, Fragment} from 'react'

const PageNation = props => {
    console.log("props.maxPage: " + props.maxPage);
    return(
        <Fragment>
        
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

export default PageNation