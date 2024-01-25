# Novadata Exam

O projeto foi gerado com o docker utilizando o docker compose para gerenciar os containers.<br/>
Antes de rodar o servidor de desenvolvimento, baixar as dependencias do projeto.<br/>
Certifique-se de estar usando pelo menos a versão 16 do Nodejs.<br/>
Rode o seguinte comando para garantir a equivalência do lock json file ao baixar as libs: `npm ci` <br> <hr>

<hr>

## Subindo e requisitando o Servidor

- Para subir o servidor em modo de log (+ aconselhável) rode o seguinte comando `npm run s:log`.<br>
- Para subir o servidor sem o docker (- aconselhável) rode o seguinte comando `npm run dev`.<br>
- Para subir o servidor em modo detached rode o seguinte comando `npm run start`. Para matar as instancias dos containers navegue até a raiz e rode `docker-compose stop`<br>
- Para realizar as requests manualmente navegue até a pasta _requests-curl_, e execute em seu terminal após o server up. <br>

*OBS: Se o servidor não conectou ao banco, provavelmente o ip local está diferente da assinatura do link simbólico, para checar, mesmo com o erro no terminal com a instância ativa, em outro terminal rode o seguinte comando para identificar o IP em que está a instância do mongodb: `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <id>`, onde id seria o id da imagem podendo ser consultada através do `docker ps`. <br> Após checar o IP, substitua ele pela keyworw localhost, preservando a porta: `27017`, mate a instância e rode o server novamente*.

## Tech Through

- Foi utilizado o mongodb para persistência de dados juntamente com o mongoose para lidar com as database requests. <br>
- Foi utilizado o multer middleware para o processamento em persistir a imagem em uma pasta na aplicação. <br>
- Foi utilizado o sharp para o processamento da imagem com relação a minificação. <br>
- Foi utilizado o concurrently para garantir a execução de dois ou mais comandos para rodar os scripts do projeto. <br>
- Foi implementada a classe CacheMiddleware para lógica da persistência temporária do dado em memória a fim de uma simples demo. Soluções alternativas para maior escalabilidade a depender da quantidade de dados usaria o Reddis por exemplo. <br>
- Foi implementada uma classe Utils onde centraliza algumas lógicas que podem ser úteis a aplicação, como por exemplo assingar os valores das variaveis de ambiente ao objeto process do node. <br>
- A lógica dos endpoints foram segregadas em cada controller respectivamente, centralizada em uma classe que pertence a respectiva entidade no mongoose. <br>
- Foi implementada um routes file separado com suas devidas constraints para centralizar as rotas da aplicação. <br>

## Demo


## Testes Unitários

Nenhum teste foi implementado ainda.
