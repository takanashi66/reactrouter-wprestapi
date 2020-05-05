import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom"

//コンポーネント
import NewsList from './newslist'
import NewsDetail from './newsdetail'

const PageRouter = props => {
    
    return(
        <Router>
            <Switch>
                <Route path="/">
                    <NewsList  {...props} />
                </Route>
                <Route path="/:id">
                    <NewsDetail  {...props} />
                </Route>
            </Switch>
        </Router>
    )
}

export default PageRouter