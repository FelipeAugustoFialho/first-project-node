const express = require('express')   // importa exress
const uuid = require("uuid")

const port = 3000
const app = express()    // colocando express dentro de uma variavel (ficar mais facil pra manusear)
app.use(express.json())

/*
-Query params => meusite.com/users?nome=felipe&age=32 // FILTROS
-Route params => /users2     // BUSCAR,DELETAR OU ATUALIZAR ALGO ESPECÍFICO
-Request Body => {"name":"Felipe","age":}

-GET          => Buscar informação  no back-end
- POST        => Criar informaçã no back-end
- PUT / PATCH => Alterar /Atualizar informação no back-end
-DELETE       => DELETAR informaçã n back-end
- Middleware  => INTERCEPTADOR => tem o poder de parar ou alterar dados da requisição
*/
// RODAR SERVIDOR NPM RUN DEV


const users = [] // <<<SIMULANDO UM BANCO DE DADOS<<

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    console.log('a rota foi chamada')
    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name: name, age: age }
    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id',checkUserId, (request, response) => {

    const { name, age } = request.body

    const index = request.userIndex
    
    const id = request.userId

    const updateUser = { id, name, age }



    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id',checkUserId, (request, response) => {

    const index = request.index
    
    users.splice(index, 1)
    return response.status(204).json()
})
/*
app.get('/users', (request, response) => {            // escolhendo o método(rotas) do express    

    return response.json(users)
})

app.post('/users', (request, response) => {            // escolhendo o método(rotas) do express    
    const { name, age } = request.body
    console.log(uuid.v4())
    //const user = {id: uuid.v4(),name:name,age:age}

    return response.json(users)
})
*/



app.listen(port, 3000, () => {
    console.log(`Server started on port ${port}`)
})      // avisar em qual porta vai utilizar 