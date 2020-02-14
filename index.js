//import as early as u can
require('dotenv').config()

// import modul http
const http = require('http')
const { Client } = require('pg')
//import pg Client
// karena saya ga butuh fitur pooling, maka saya hanya akan
// ambil (destructure) Clientnya saja
// ini namanya syntax 'object destructuring'
// jadi pg sendiri itu isinya nested object
// utk mengambil hanya bagian CLient syntacxnya {Client}
// 

// membuat http server sama kyk yg di petani kode
const server = http.createServer(async function(req,res){
  const client = new Client() 
  try {
    await client.connect() 
    const result = await client.query('SELECT * FROM car') 
    await client.end()
    // hasil dari query ada di result.rows 
    // sedangkan dia bentuknya ARRAY
    // sedangkan method res.end(param) hanya menerima param bentuk STRING
    var stringified = JSON.stringify(result.rows)
    // JSON.stringify() adalah method utk mengubah bentuk object/array menjadi string
    res.end(stringified)
  } catch (e) {
    console.log(e);
  } 
})


// pasang port listener di port 3000 aja misalnya
server.listen(3000,function(){
  console.log('server listening port 3000 blablabla')
})