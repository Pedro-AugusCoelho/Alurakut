import {SiteClient} from 'datocms-client';

export default async function RecebRequestsPublications(req , res){

  if(req.method === 'POST'){
    const token = '1445b22c332eeaa34b3081a0cfc69b'
    const client = new SiteClient(token);
  
    const RegistroCriado = await client.items.create({
      itemType:'975092', // ID do model de "publications" criado pelo dato
      ...req.body,
    })
    res.json({
      RegistroCriado: RegistroCriado,
    });
    return;
  }
}