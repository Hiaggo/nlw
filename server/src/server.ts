import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

/* 
GET: Busca ou lista uma informação
POST: Cria uma nova informação
PUT: Atualiza uma informação existente
DELETE: Deleta uma informação

Corpo (Request Body): Dados para criação ou atualização de um registro
Route Params: Identifica um recurso dentro de uma rota para atualizar ou deletar
Query Params: Paginação, filtros, ordenação 
*/


/* app.get('/users', (request, response) => {
    const users = [
        {name: 'Diego', age: 25},
        {name: 'Vini', age: 21},
    ];

    return response.json(users);
});

app.delete('/users/:id', (request, response) => {
    console.log(request.params);
    const users = [
        {name: 'Diego', age: 25},
        {name: 'Vini', age: 21},
    ];

    return response.json(users);
});


app.post('/users', (request, response) => {
    console.log(request.body);
    const users = [
        {name: 'Diego', age: 25},
        {name: 'Vini', age: 21},
    ];

    return response.json(users);
});
 */

 app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

