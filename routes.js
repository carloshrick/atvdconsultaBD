
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

// rota get que retorna todos os registros no banco de dados
routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Registros`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('não encontramos os registros :( ')
   }
})

//get específico que retorna somente o id
routes.get('/chamado/:id', async (req, res)=>{
    try{
        const { id } = req.params //pedindo o id especifico do parametro
        const { recordset } =  await pool.query`SELECT * from Registros WHERE id = ${ id }`
         return res.status(200).json(recordset)
    }
    catch(error){
         return res.status(501).json('esse id não existe ;-; ')
    }
 })
 
//registrando chamado novo
routes.post('/chamado/novo', async (req, res)=>{
    try{
        const { data, nome, descricao} = req.body;
        await pool.query`insert into Produtos values(${data},${nome},${descricao} )`
        return res.status(201).json(`ok`)
    }

    catch(error){
        return res.status(501).json('erro ao inserir chamado ): ')
    }
})



export default routes