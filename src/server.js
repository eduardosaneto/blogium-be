import express from 'express';
import cors from 'cors';

const server = express();
const PORT = 4000;

server.use(cors());
server.use(express.json());

// const posts = [{
//     id: 1,
//     title: 'Hello World',
//     coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
//     contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
//     content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
//     commentCount: 2
//   }];

const posts = [];
const comment = [];  

server.get('/posts', (req, res) => {
    res.send(posts);
});

server.post('/posts', (req, res) => {
    const post = {
        id: posts.length,
        title: req.body.title,
        coverURL: req.body.coverURL,
        contentPreview: req.body.content.slice(0, 100),
        content: req.body.content,
    }
    posts.push(post);
    res.send(post);
});

server.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const response = posts.find(post => post.id === id);
    res.send(response);
});

server.listen(PORT, () => {console.log(`server succesfully listen at port ${PORT}`)});