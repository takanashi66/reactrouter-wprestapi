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
            isSingle: false,
            maxPage: 0,
            data: []
        }
        
        this.onClickPageNation = this.onClickPageNation.bind(this)
    }
    
    componentDidMount(){
        
        //ローディング開始
        this.setState({
            isLoading: true,
        })
        
        //fetchするURLを生成
        const url = domein + restUrl + postsUrl + "?" + postsParameter + "&" + perPage + "10"
        
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
                data: responseData,
            })
            
            //console.log(this.state.data);
        })
        .catch((error)=>{
            //fetch自体が失敗したとき
            console.log("取得に失敗しました。" + "error: " + error);
        })
        
    }
    
    onClickPageNation(e){
        e.preventDefault()
        const dataIndex = e.currentTarget.getAttribute('data-index')
        
        //ページネーションのliから.currentを外してcurrentTargetに.currentをつける
        const prev = e.currentTarget.parentNode.childNodes;
        prev.forEach((item, i) => {
            item.classList.remove("current")
        })
        e.currentTarget.classList.add("current")
        
        //ローディング開始
        this.setState({
            isLoading: true
        })
        
        //fetchするURLを生成
        const url = domein + restUrl + postsUrl + "?" + postsParameter + "&" + perPage + "10" + "&" + page + dataIndex
        
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
                data: responseData,
            })
        })
        .catch((error)=>{
            //fetch自体が失敗したとき
            console.log("取得に失敗しました。" + "error: " + error);
        })

    }
    
    render(){
        
        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        { this.state.isLoading ? <Loading /> : <NewsList data={ this.state.data } maxPage={ this.state.maxPage } onClickPageNation={ this.onClickPageNation } /> }
                    </Route>
                    <Route exact path="/:id">
                        { this.state.isLoading ? <Loading /> : <NewsDetail /> }
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
