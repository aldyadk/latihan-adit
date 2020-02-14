require('dotenv').config()

const http = require('http')
const { Client } = require('pg')
// pergunakan modul bawaan url pada nodejs utk melakukan parsing terhadap request url
const url = require('url');

//saya mau pake bentuk CALLBACK biasa di sini
const server = http.createServer(function(req,res){
  // console.log('ini urlnya:',req.url)
  const parsedUrl = url.parse(req.url, true)
  // console.log('ini hasil parsingannya:',parsedUrl)
  
  if(parsedUrl.pathname === "/all"){
    const client = new Client() 
    client.connect() 
    client.query('SELECT * FROM car',function(err,result){
      var stringified = JSON.stringify(result.rows)
      client.end()
      res.end(stringified)
    })
  } else if (parsedUrl.pathname === "/") {
    res.end('home page') 
  } else if (parsedUrl.pathname === "/person") {
    const email = parsedUrl.query.email
    // email harus valid ga ada tanda kutip
    if(email.indexOf("'")>-1){
      res.end("input tidak valid")
    } else {
      // baru jalanin querynya
      const client = new Client() 
      client.connect() 
      client.query(`SELECT * FROM person WHERE email='${email}'`,function(err,result){
        // ini harusnya hanya query sesuai email aja
        if(err){
          console.log(err)
          res.end('error')
        } else {
          var stringified = JSON.stringify(result.rows)
          client.end()
          res.end(stringified)
        }
      })
    }
  } else if (parsedUrl.pathname === "/add") {
    const make = parsedUrl.query.make
    const model = parsedUrl.query.model
    const price = Number(parsedUrl.query.price) //convert karena query parameter bentuknya string
    const client = new Client() 
    client.connect() 
    client.query(`INSERT INTO car (make,model,price) VALUES ('${make}','${model}',${price})`,function(err,result){
      client.end()
      if(err){
        console.log(err)// ini kita sebagai dev yg perlu tau
        res.end('error, something happened')
      } else {
        console.log(result)// ini kita sebagai dev yg perlu tau
        res.end('sukses insert data')
      }
      
    }) 
  } else {
    res.end('route not found')
  }
  
  
})


server.listen(3000,function(){
  console.log('server listening port 3000 blablabla')
})