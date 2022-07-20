import { legacy_createStore as createStore,combineReducers,applyMiddleware } from 'redux'
import axios from 'axios'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { faker } from '@faker-js/faker'

const movieReducer = (state=[],action)=>{
  if( action.type==='CREATE_MOVIE' ){
    return [...state, action.movie]
  }
  if( action.type==='GET_MOVIE' ){
    return action.allMovies
  }
  if( action.type==='DELETE_MOVIE' ){
    return state.filter(movie=>movie.id !== action.item.id)
  }
  if( action.type==='UPDATE_MOVIE' ){
    return state.map((movie)=>movie.id===action.item.id ? movie=action.item:movie)
  }

  return state
}

const reducer =combineReducers({
    movies:movieReducer
    })


export const createAMovie = ()=>{
    return async(dispatch)=>{
      const newMovie = {name:faker.name.findName()}
      const movie=(await axios.post('/api/movies',newMovie)).data
      console.log('##movie:',movie)
      dispatch({type:'CREATE_MOVIE',movie})
    }
}

export const deleteAMovie = (id)=>{
    return async(dispatch)=>{
      const item = (await axios.delete(`/api/movies/${id}`)).data
      dispatch({type:'DELETE_MOVIE',item})
    }
}
export const updateStar = (id,dir)=>{
    return async(dispatch)=>{
      const item= (await axios.put(`/api/movies/${id}`,{dir:dir})).data
      dispatch({type:'UPDATE_MOVIE',item})
    }
}


export const getAllMovies = ()=>{
    return async(dispatch)=>{
      const allMovies=(await axios.get('/api/movies')).data
      //console.log('allmovies:',allMovies)
      dispatch({type:'GET_MOVIE',allMovies})
    }
}


const store = createStore(reducer,applyMiddleware(logger,thunk))

export default store
