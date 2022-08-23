import { Request, ResponseToolkit} from '@hapi/hapi'
import {directorRepository} from '../repositories/directorRepository'

export const directorList = async (request: Request, h: ResponseToolkit) =>{
    
    const directorList = await directorRepository.find();
    try {

        if(directorList.length == 0)
            return h.response({message: "Não existe nenhum diretor cadastrado!"}).code(404)
        
        return h.response({message:`Lista de diretores encontrados:: Quantidade ${directorList.length}`,data:directorList}).code(200)
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
    
}

 export const newDirector = async (request: Request, h: ResponseToolkit) =>{

     const data = request.payload
     const nome = Object.values(data)[0] 
     const nameExists = await directorRepository.findOneBy({nome:nome})
     
     try {
        if (nameExists) {
            console.log(`O diretor ${nome} já está cadastrado!`);
            return h.response(`O diretor ${nome} já está cadastrado!`).code(400)
        }
    
        if(nome != "" ){
            const newDirector = directorRepository.create({nome: `${nome}`})
            await directorRepository.save(newDirector)
            return h.response({newDirector}).code(200)
        }
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
}


 export const editDirector = async (request: Request, h: ResponseToolkit) =>{
    
     const {id_director} = request.params
     const data = request.payload
     const nome = Object.values(data)[0] // :(
     const directorSelected = await directorRepository.findOneBy({id:id_director});
     const allDirectors = await directorRepository.find()
     var nameEquals = false
     try {
        allDirectors.map(data=>{
             const name = data.nome
             if(nome === name) nameEquals = true
        });
        
        if (!directorSelected )return h.response({message:"Diretor não encontrado!"}).code(404)        
        if(nome.length == 0  )return h.response({message:"Diretor não encontrado!"}).code(404)        
        if(nameEquals)return h.response({message:`O diretor ${nome} já está cadastrado!`}).code(404)  
    
        await directorRepository.update(id_director,{nome})
        return h.response(
            {message:"Dados editados com sucesso",
             antigo:directorSelected.nome,
              novo:data}
            ).code(200);
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
    
}

 export const deleteDirector = async (request: Request, h: ResponseToolkit) =>{
    
     const {id_director} = request.params
     const directorSelected = await directorRepository.findOneBy({id:id_director});
     try {
        if(!directorSelected)
            return h.response({message:`Diretor com id '${id_director}' não foi encontrado!`}).code(404)

        await directorRepository.delete({id: id_director})
        return h.response({message:`O diretor ${directorSelected.nome} foi excluido com sucesso`}).code(203)
    } catch (err) {
        console.log(`Error:: ${err}`);
    }
    
}
