import {initServer} from './server'
import {AppDataSource} from './data-source'


AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com banco de dados realizada com sucesso!")
        initServer()
        
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:: ", err)
    })




