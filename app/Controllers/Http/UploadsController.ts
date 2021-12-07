import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Upload from 'App/Models/Upload'
import StoreUploadValidator from 'App/Validators/StoreUploadValidator'

export default class UploadsController {
  public async index({}: HttpContextContract) {
    const uploadDB = await Upload.all()
    return uploadDB
  }
  
  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreUploadValidator)
    const uploadDB = await Upload.create({...data, user_id: auth.user?.id})
    return uploadDB
  }

  public async show({params, response}: HttpContextContract) {
    try {
      const uploadDB = await Upload.findOrFail(params.id)
      return uploadDB
    } catch (error) {
      response.status(400).send("Upload descrito não foi encontrado!")
    }
  }
  public async update({request,params, response}: HttpContextContract) {
    try {
    const uploadDB = await Upload.findOrFail(params.id)
    const data = await request.validate(StoreUploadValidator)
    uploadDB.descricao = data.descricao
    await uploadDB.save()
    return uploadDB
    } catch (error) {
      response.status(400).send("Upload descrito não foi encontrado!")
    }
  }

  public async destroy({response,params}: HttpContextContract) {
    try {
      const uploadDB = await Upload.findOrFail(params.id)
      await uploadDB.delete()
      return uploadDB
    } catch (error) {
      response.status(400).send("Upload descrito não foi encontrado!")
    }
  }
}
