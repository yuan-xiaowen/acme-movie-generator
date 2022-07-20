const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-movie-db')


const Movie = db.define('movie',{
    name:{
      type:Sequelize.STRING,
      allowNull:false
    },
    star:{
      type:Sequelize.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true,
        min: 1,
        max: 5
      },
      defaultValue:3
    }
  })

const setUp = async()=>{
  await db.sync({force:true})
}

setUp()

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

app.get('/api/movies',async(req,res,next)=>{
  try{
    res.send(await Movie.findAll({'order':[['star','DESC'],['name']]}))
  }catch(err){
    next(err)
  }
})

app.post('/api/movies',async(req,res,next)=>{
  try{
    const movie = await Movie.create(req.body)
    res.send(movie)
  }catch(err){
    next(err)
  }
})

app.delete('/api/movies/:id',async(req,res,next)=>{
  try{
    const item = await Movie.findByPk(req.params.id)
    await item.destroy()
    res.send(item)
  }catch(err){
    next(err)
  }
})

app.put('/api/movies/:id',async(req,res,next)=>{
  try{
    console.log('***pa:',req.params)
    console.log('%%%body:',req.body)
    const star=(await Movie.findByPk(req.params.id)).star
    await Movie.update({star:star+req.body.dir},{where:{id:req.params.id}})
    const updated =await Movie.findByPk(req.params.id)
    res.send(updated)
  }catch(err){
    next(err)
  }
})



const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
