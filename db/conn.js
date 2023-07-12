const mongoose = require('mongoose');
const DB = 'mongodb+srv://yashd:ramlal@nodeexpressproject.qp0arwg.mongodb.net/chess?retryWrites=true&w=majority';
mongoose.connect(DB).then(()=>{
  console.log("Connection successful...");
}).catch((err)=>{
  console.log(err);
})
