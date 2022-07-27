const {Server} = require('@hapi/hapi')
const {routes} = require( './routes/routes')
// import dotenv = require('dotenv')
// import express = require('express')


// dotenv.config()


// servidor utilizando hapiJs
export const initServer = async ()=>{
    const server = new Server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    });

    routes(server)

    await server.start();
    console.log(`Servidor rodando em:: ${server.info.uri}`);

    process.on('unhandledRejection',(err)=>{
        console.log(err);
        process.exit(0)
    })
    
}

