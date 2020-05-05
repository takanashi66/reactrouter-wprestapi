import React, {Component,Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

//コンポーネント
import Loading from './components/loading'
import NewsList from './components/newslist'
import NewsDetail from './components/newsdetail'

class News extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            maxPage: 0,
            currentPage: 1,
            data: [],
            single: {}
        }
        
        this.onClickPageNation = this.onClickPageNation.bind(this)
        this.getFetch = this.getFetch.bind(this)
    }
    
    componentDidMount(){
        
        //fetchするURLを生成
        const url = domein + restUrl + postsUrl + "?" + postsParameter + "&" + perPage + "10"
        this.getFetch(url, 'data')
    }
    
    getFetch(url, stateName){
        //ローディング開始
        this.setState({
            isLoading: true,
        })
        
        fetch(url)
        .then((response) => {
            this.setState({
                maxPage: response.headers.get('x-wp-totalpages')
            })
            return response.json()
        })
        .then((responseData) => {
            this.setState({
                isLoading: false,
                [stateName]: responseData,
            })
        })
        .catch((error)=>{
            //fetch自体が失敗したとき
            console.log("取得に失敗しました。" + "error: " + error);
        })
    }
    
    onClickPageNation(e){
        e.preventDefault()
        const dataIndex = e.currentTarget.getAttribute('data-index')
        
        //ローディング開始
        this.setState({
            currentPage: dataIndex
        })
        
        //fetchするURLを生成
        const url = domein + restUrl + postsUrl + "?" + postsParameter + "&" + perPage + "10" + "&" + page + dataIndex
        this.getFetch(url, 'data')
    }
    
    render(){
        
        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        { this.state.isLoading ? <Loading /> : <NewsList data={ this.state.data } currentPage={this.state.currentPage} maxPage={ this.state.maxPage } onClickPageNation={ this.onClickPageNation } /> }
                    </Route>
                    <Route exact path="/:id">
                        { this.state.isLoading ? <Loading /> : <NewsDetail getFetch={this.getFetch} single={this.state.single} /> }
                    </Route>
                </Switch>
            </Router>
        )
    }
    
}

//レンダリング
ReactDOM.render(
    <News />,
    document.getElementById('news')
)
