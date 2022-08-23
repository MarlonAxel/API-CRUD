import { Request, ResponseToolkit } from "@hapi/hapi"
import { directorRepository } from "../repositories/directorRepository"
import { movieRepository } from "../repositories/movieRepository"

var movieEquals = false

//Função para add um novo filme
export const newMovie = async (request: Request, h: ResponseToolkit) =>{
    
    const data = request.payload
    const {id_director} = request.params
    const title = Object.values(data)[0] // :(
    const genero = Object.values(data)[1] // :( 
    const movieExists = await movieRepository.find()

    try{    
        movieExists.map(data=>{
            const titles = data.titulo
            if(titles === title) movieEquals = true
        })

        const director = await directorRepository.findOneBy({ id: Number(id_director) })

        if (!director)return h.response("Diretor não encontrado")
        if(movieEquals)return h.response({message:`O filme ${title} já está cadastrado!`}).code(404)
        
        const newMovie = movieRepository.create({titulo: `${title}`, genero: `${genero}`, diretor:id_director})
        await movieRepository.save(newMovie)
        return h.response(newMovie).code(200)
      
    }catch(err){
        console.log("Error :: ",err);
        
    }
}

//Função para buscar todos os filmes
export const movieList = async (request: Request, h: ResponseToolkit)=>{
    
    const movieList = await movieRepository.find({
        relations:{
            diretor: true

        }
    })
    
    
    try {
        if(movieList.length == 0){return h.response({message:"Não existe nenhum filme cadastrado!"}).code(201)}

        return h.response({message: 'Lista de filmes encontrados', Quantidade: movieList.length, Filmes: movieList}).code(201)
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
}

//Função para editar um filme
export const editMovie = async (request: Request, h: ResponseToolkit)=>{
    
    const {id_movie} = request.params
    const data = request.payload
    const titulo = Object.values(data)[0] // :(
    const genero = Object.values(data)[1] // :( 
    
    const movieSelected = await movieRepository.findOneBy({id:id_movie});

    if (!movieSelected) 
        return h.response({message:"Filme não encontrado!"}).code(404)
        
    await movieRepository.update(id_movie,{titulo, genero})
    return h.response(data).code(200)
    
}

//Função para deletar um filme
export const deleteMovie = async (request: Request, h: ResponseToolkit)=>{
    
    const {id_movie} = request.params
    const movieSelected = await movieRepository.findOneBy({ id:id_movie });
    if (!movieSelected) 
        return h.response({message:`Filme com id '${id_movie}' não foi encontrado!`}).code(404)

    await movieRepository.delete({id: id_movie})
    return h.response({message:`O filme ${movieSelected.titulo} foi excluido com sucesso`}).code(203)
}

