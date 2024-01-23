const mongoose = require('mongoose');

const Posts = mongoose.model('Posts');

module.exports = {

    async store(req, res) { // requisição que insere o post.
        const postData = req.body;
        try {
            
            // await Posts.find(postData, (e, resp) => {
            //     if(e) {
            //         return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e } });
            //     }
                
            //     hasData = resp.length ? true : false;
            // });

            // if(hasData) {
            //     return res.status(409).send({ err: { message: 'Estabelecimento já cadastrado.' } });
            // }
    
            const posts = await Posts.create(postData);
            
            return res.send(posts);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    },

    async getAll(req, res) {
        
        try {
            const postsArr = await Posts.find();
            return res.send(postsArr);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível retornar a lista de Estabelecimentos.', e }  });
        }

    }
}