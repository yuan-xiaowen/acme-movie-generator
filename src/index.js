import { createRoot } from 'react-dom/client'
import React, { Component } from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'
import Home from './Home'
import { Provider,connect } from 'react-redux'
import store,{ getAllMovies } from './store'


class _App extends Component{
    componentDidMount(){
        this.props.getMovies()
    }
    
    render(){
        return(         
           <div>
             <Route path='/' component={ Home } />                    
           </div>
            
        )
    }
}

const mapToDispatch = (dispatch)=>{
    return{
        getMovies:()=>{
            dispatch(getAllMovies())
          }

    }
}


const root = createRoot(document.querySelector('#root'));
const App = connect(null,mapToDispatch)(_App )
root.render(<Provider store={store}><Router><App /></Router></Provider>);
