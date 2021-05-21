const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./database/db');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/todos', async (req, res) => {

    const { description } = req.body;

    try{

        const newTodo = await pool.query(`INSERT INTO todo (description) VALUES ($1) RETURNING *`, [description]);
        res.json(newTodo.rows);

    } catch(err){

        console.log(err.message)

    }
});

app.get('/todos', async (req, res) => {
    try{

        const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id ASC');
        res.json(allTodos.rows);

    } catch(err){

        console.log(err.message);

    }
})

app.get('/todos/:id', async (req, res) => {
    try{

        const { id } = req.params;
        const getTodo = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [id]);
        res.json(getTodo.rows);

    }catch(err){
        console.log(err.message)
    }
});

app.put('/todos/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;

        await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2`, [description, id]);

        const getTodo = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [id]);

        res.json(getTodo.rows);

    }catch(err){
        console.log(err.message);
    }
})


app.delete('/todos/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await pool.query(`DELETE FROM todo WHERE todo_id = $1`, [id]);

        res.json('Deleted successfully!');

    }catch(err){
        console.log(err.message)
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});