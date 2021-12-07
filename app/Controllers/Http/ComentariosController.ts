
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/Comentario'
import StoreComentarioValidator from 'App/Validators/StoreComentarioValidator'

export default class ComentariosController {
  public async index ({}: HttpContextContract) {
    const comentarioDB= await Comentario.all()
    return comentarioDB
  }

  public async store ({request,auth}: HttpContextContract) {
    const data= await request.validate(StoreComentarioValidator)
    const comentarioDB = await Comentario.create({...data, user_id: auth.user?.id})
    return comentarioDB
  }


  public async show ({params,response}: HttpContextContract) {
    try{
      const comentarioDB = await Comentario.findOrFail(params.id)
      return comentarioDB
    }catch (error){
      response.status(400).send("Comentario não encontrado!")
    }
  }

  public async update ({request,params,response}: HttpContextContract) {
   try{
    const comentarioDB = await Comentario.findOrFail(params.id)
    const data= await request.validate(StoreComentarioValidator)
    comentarioDB.comentarios = data.comentarios
    await comentarioDB.save()
    return comentarioDB
   } catch (error){
     response.status(400).send("Comentario não encontrado!")
   }
  }

  public async destroy ({params,response}: HttpContextContract) {
    try{
    const comentarioDB = await Comentario.findOrFail(params.id)
    await comentarioDB.delete()
    return comentarioDB
    } catch (error){
      response.status(400).send("Comentario não encontrado!")
    }
  }
}
