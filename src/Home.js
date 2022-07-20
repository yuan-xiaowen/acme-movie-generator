import React, { useEffect }from 'react'
import { connect } from 'react-redux'
import { createAMovie, deleteAMovie, updateStar, getAllMovies } from './store'


const Home =({movies,create,deleteMovie,updateStar,getMovies})=>{
  useEffect(()=>{
    getMovies()
  })

  return(
    <main>
      <button onClick={create} className='create'>add a movie</button>
      <ul>
        {movies.length===0?'There is no Movie':movies.map((movie)=>{
          return(
             <li key={ movie.id }>
              <button onClick={()=>deleteMovie(movie.id)}>delete</button> 
               { movie.name } ({ movie.star }) 
              <button onClick={()=>updateStar(movie.id,1)}>star +</button>
              <button onClick={()=>updateStar(movie.id,-1)}>star -</button>
             </li>)
        })}
      </ul>
      <p>{movies.length===0?'':'Average-Rating:'+((movies.reduce((acc,movie)=>{return acc+movie.star},0))/movies.length).toFixed(1)}</p>
   </main>
   )
  }

const mapState= ({movies})=>{
  return{
    movies
  }
}

const mapToDispatch= (dispatch)=>{
  return{
    create:()=>{
      dispatch(createAMovie())
    },
    deleteMovie:(id)=>{
      dispatch(deleteAMovie(id))
    },
    updateStar:(id,dir)=>{
      dispatch(updateStar(id,dir))
    },
    getMovies:()=>{
      dispatch(getAllMovies())
    }
  }
}

export default connect(mapState,mapToDispatch)(Home)