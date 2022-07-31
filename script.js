const express=require('express');
const app=express();
const axios=require('axios');
const { Pool } = require('pg')
const pool = new Pool({
	user:'postgres',
	database:'postgres',
	password:'sandeep02',
	port:5432,
	host:'localhost',
})
var i=2;
pool.connect((err,client,done)=>{
	if (err) throw err
    /*client.query('CREATE TABLE jokes(id serial PRIMARY KEY,question VARCHAR (2000) UNIQUE NOT NULL,punchline VARCHAR (2000) UNIQUE NOT NULL)',(error,result)=>{
		console.log("Table Created");
	})*/
        client.query("SELECT max(id) from jokes",(error,result)=>{
        if(err) console.log(err);
		console.log(result.rows[0].max);
        i=(result.rows[0].max)+1;
        console.log(i);
        })
        axios.get('https://backend-omega-seven.vercel.app/api/getjoke').then((data)=>{
        console.log(data.data[0]);
        var question=data.data[0].question;
        console.log(question);
        var punchline=data.data[0].punchline;
        console.log(punchline);
        client.query("INSERT INTO jokes (id,question,punchline) VALUES("+i+",'"+question+"','"+punchline+"')",(error,result)=>{
        if(err) console.log(err);
		console.log("value inserted");
        })
    })
})