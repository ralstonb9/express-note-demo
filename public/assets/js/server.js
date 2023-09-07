const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('./public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json')).then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
   
    if(title && text){
        const newPost = {
            title,
            text,
            id: uuid(),
        };
        
        fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
            const parsedPosts = JSON.parse(data);
            parsedPosts.push(newPost);
        });
    
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(parsedPosts, null, 2), (err) => {
            if (err) throw err;
            res.json(newPost);
        });
    }
});