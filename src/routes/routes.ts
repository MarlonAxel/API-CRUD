import {Server, Request, ResponseToolkit} from "@hapi/hapi"
import { newMovie, movieList, editMovie, deleteMovie } from "../controllers/MovieController"
import {newDirector,editDirector,deleteDirector,directorList} from "../controllers/DirectorController"
import {serieList,newSerie,editSerie,deleteSerie} from "../controllers/SerieController"

export const routes = (server: Server)=>{

    /*Rotas relacionadas ao Diretor*/ 
    server.route({
        method: 'GET',
        path: '/director', 
        handler: directorList
    })
    server.route({
        method: 'POST',
        path: '/create', 
        handler: newDirector
    })
    server.route({
        method: 'PUT',
        path: '/director/{id_director}/edit', 
        handler: editDirector
    })
    server.route({
        method: 'DELETE',
        path: '/director/{id_director}/delete', 
        handler: deleteDirector
    })

    /*Rotas relacionadas ao Filme*/ 
    server.route({
        method: 'GET',
        path:'/movie',
        handler: movieList
    });
    server.route({
        method: 'POST',
        path: '/movie/{id_director}/create',
        handler: newMovie 
    })
    server.route({
        method: 'PUT',
        path: '/movie/{id_movie}/edit',
        handler: editMovie 
    })
    server.route({
        method: 'DELETE',
        path: '/movie/{id_movie}/delete',
        handler: deleteMovie 
    })

    /*Rotas relacionadas a Serie*/ 
    server.route({
        method: 'GET',
        path: '/series',
        handler: serieList
    })
    server.route({
        method: 'POST',
        path: '/serie/{id_director}/create',
        handler: newSerie
    })
    server.route({
        method: 'PUT',
        path: '/serie/{id_serie}/edit',
        handler: editSerie
    })
    server.route({
        method: 'DELETE',
        path: '/serie/{id_serie}/delete',
        handler: deleteSerie
    })
   
    
}