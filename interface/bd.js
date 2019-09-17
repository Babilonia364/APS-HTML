const Sequelize = require('sequelize');
const sequelize = new Sequelize('aps','root','',{
    host:"localhost",
    dialect:"mysql"
})

sequelize.authenticate().then(function(){
    console.log("conectado com o bd")
}).catch(function(erro){
    console.log("falha ao se conectar: "+erro)
})