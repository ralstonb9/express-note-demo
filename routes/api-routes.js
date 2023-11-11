const path = require('path')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        });
    });
    
    app.post('/api/notes', (req, res) => {
        const {title, text} = req.body;
       
        if(title && text){
            const newPost = {
                title,
                text,
                id: uuidv4(),
            };
            
            fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
             const parsedPosts = JSON.parse(data);
             parsedPosts.push(newPost);
             fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedPosts, null, 2), (err) => {
                 if (err) throw err;
                 res.json(newPost);
             });
            });
        
        }
    });
    
    app.delete('/api/notes/:id', (req,res) => {
        const noteId = req.params.id;
        console.log('this is the noteId', noteId);
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) throw err;
    
            let notes = JSON.parse(data);
            notes = notes.filter(note => note.id !== noteId);
            
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
                if (err) throw err;
                res.json({message: "Note deleted"});
            });
        });
    });
};