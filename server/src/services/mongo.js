const mongoose=require('mongoose');

const uri = "mongodb+srv://ranjithkumarseekolu1:JUBj2JSkM5WRJaFu@cluster0.21dfa.mongodb.net/NasaDB?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connection.once("open",()=>{
    console.log("mongoDB connection ready!");
  });
  
mongoose.connection.on("error",(err)=>{
    console.warn(err);
})

async function mongoConnect(){
    await mongoose.connect(uri)
} 

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports={
    mongoConnect,
    mongoDisconnect
}