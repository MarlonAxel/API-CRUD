import { Request, ResponseToolkit} from '@hapi/hapi'
import { directorRepository } from '../repositories/directorRepository';
import { serieRepository } from '../repositories/serieRepository'

export const newSerie = async (request: Request, h: ResponseToolkit) =>{
    
    const data = request.payload
    const { id_director } = request.params
    const titulo = Object.values(data)[0] // :(
    const genero = Object.values(data)[1] // :(
    const qtd_temporada = Object.values(data)[2] 
           
    try{
        
        const director = await directorRepository.findOneBy({ id: Number(id_director) })
        
        if (!director) {return h.response({message: `O diretor com id '${id_director}' não foi encontrado!`}).code(404)}
        
        const newSerie = serieRepository.create({titulo: `${titulo}`, genero: `${genero}`,qtd_temporada:qtd_temporada, diretor:id_director})
        await serieRepository.save(newSerie)
        return h.response(newSerie).code(201)
      
    }catch(err){
        console.log("Error :: ",err); 
    }
}

export const serieList = async (request: Request, h:ResponseToolkit)=>{

    const serieList = await serieRepository.find();
    
    try {

        if(serieList.length == 0)return h.response({message: "Não existe nenhuma serie cadastrada!"}).code(404)

        return h.response({message:`Lista de series encontradas:: Quantidade ${serieList.length}`,data:serieList}).code(200)
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
}

export const editSerie = async (request: Request, h:ResponseToolkit)=>{

    const {id_serie} = request.params
    const data = request.payload
    const titulo = Object.values(data)[0] 
    const genero = Object.values(data)[1] 
    const qtd_temporada = Object.values(data)[2] 
    const serieSelected = await serieRepository.findOneBy({id:id_serie});
        
   try {
       if (!serieSelected) {
           return h.response({message:"Serie não encontrada!"}).code(404)        
       }
     
       await serieRepository.update(id_serie,{titulo,genero,qtd_temporada})
       return h.response(
           {message:"Dados editados com sucesso", data:data}).code(200);
   } catch (err) {
       console.log(`Error:: ${err}`);
   }
}
export const deleteSerie = async (request: Request, h:ResponseToolkit)=>{
    const {id_serie} = request.params
    const serieSelected = await serieRepository.findOneBy({id:id_serie});
    try {
        if (!serieSelected) 
            return h.response({message:`Serie com id '${id_serie}' não foi encontrada!`}).code(404)
    
        await serieRepository.delete({id: id_serie});
        return h.response({message:`A serie ${serieSelected.titulo} foi excluida com sucesso!`}).code(203)
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
}
