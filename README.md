# Novadata Exam

O projeto foi gerado com o docker utilizando o docker compose para gerenciar os containers.<br/>
Certifique-se de ter o docker instalado e estar usando pelo menos a versão 18 do Nodejs.<br/>
Rode o seguinte comando para garantir a equivalência do lock json file ao baixar as libs: `npm ci` <br> <hr>

## Subindo e requisitando o Servidor

- (Windows) Para subir o servidor em modo de log (+ aconselhável) rode o seguinte comando no *CMD*: `npm run sw:log`.<br>
- (Linux) Para subir o servidor em modo de log (+ aconselhável) rode o seguinte comando `npm run sl:log`.<br>
- Para subir o servidor sem o docker (- aconselhável) rode o seguinte comando `npm run dev`.<br>
- (Windows) Para subir o servidor em modo detached rode o seguinte comando `npm run start:windows`. Para matar as instancias dos containers navegue até a raiz e rode `docker compose stop`<br>
- (Linux) Para subir o servidor em modo detached rode o seguinte comando `npm run start:linux`. Para matar as instancias dos containers navegue até a raiz e rode `docker compose stop`<br>
- Para realizar as requests manualmente navegue até a pasta _requests-curl_, e execute em seu terminal após o server up. <br>
- Verifique cada request para enviar os parâmetros de cada endpoint, a estrutura já está montada, só é necessário informar o valor do parâmetro. <br>
- Para rodar as requests com o curl, certifique-se de tê-lo instalado, caso contrário pode utilizar qualquer outro (Postman), com os mesmos parâmetros, se atentando para a configuração de headers, queries & body. <br>

**OBS: Se o servidor não conectou ao banco, provavelmente o ip local está diferente da assinatura do link simbólico, para checar, mesmo com o erro no terminal com a instância ativa, em outro terminal rode o seguinte comando para identificar o IP em que está a instância do mongodb: `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <id>`, onde id seria o id da imagem podendo ser consultada através do `docker ps`. <br> Após checar o IP, substitua ele pela keyword localhost, preservando a porta: `27017` no arquivo .env do projeto, em sequência mate a instância e rode o server novamente**.

## Tech Through

- Foi utilizado o mongodb para persistência de dados juntamente com o mongoose para lidar com as database requests. <br>
- Foi utilizado o multer middleware para o processamento em persistir a imagem em uma pasta na aplicação. <br>
- Foi utilizado o sharp para o processamento da imagem com relação a minificação. <br>
- Foi utilizado o concurrently para garantir a execução de dois ou mais comandos para rodar os scripts do projeto. <br>
- Foi implementada a classe CacheMiddleware para lógica da persistência temporária do dado em memória a fim de uma simples demo. Soluções alternativas para maior escalabilidade a depender da quantidade de dados o Reddis poderia ser uma boa opção. <br>
- Foi implementada uma classe Utils onde centraliza algumas lógicas que podem ser úteis a aplicação, como por exemplo assinar os valores das variáveis de ambiente ao objeto process do node. <br>
- A lógica dos endpoints foram segregadas em cada controller respectivamente, centralizada em uma classe que pertence a respectiva entidade no mongoose. <br>
- Foi implementada um routes file separado com suas devidas constraints para centralizar as rotas da aplicação. <br>

## Demo

- Vai ser implementado aqui uma demo de como rodar as requisições pelo curl e os valores da resposta da api em GIF.

## Testes Unitários

Nenhum teste foi implementado ainda.
