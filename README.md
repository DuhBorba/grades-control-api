# grades-control-api

## Sobre este projeto
Esse foi o desafio final do módulo 2 do Bootcamp Full Stack do [IGTI - Instituto de Gestão e Tecnologia da Informação](https://www.igti.com.br/), foi preciso desenvolver uma API, criando endpoints utilizando NodeJS e Express, para manipulação de notas de alunos, criando, atualizando, deletando e consultando através das requisições. Utilizei também a biblioteca Winston para a gravação de logs. 

O arquivo passado para fazer a manipulação foi apenas [grades.json](https://github.com/DuhBorba/grades-control-api/blob/master/src/grades.json), onde contém 
alguns exemplos de registos.

### Enunciado do trabalho
* [Enunciado](https://github.com/DuhBorba/grades-control-api/blob/master/enunciado.pdf)

### IGTI
O Instituto de Gestão e Tecnologia da Informação, fundado em 2006, é uma instituição de ensino superior credenciada pelo MEC. 
É referência nacional na formação profissional em TI e Tecnologias Emergentes, e possui um modelo educacional a distância que prioriza a excelência acadêmica dos seus alunos

### Pré-requisitos

Para instalar você vai precisar:

* Node.js

### Instalação

Instalação das dependências do projeto:

``
npm install
``

Instalação do nodemon:

``
npm install -g nodemon
``

### Para produção:

``
nodemon index.js
``

## Desenvolvimento

Para o desenvolvimento foi necessário:
* Manipular os arquivos json
* Utilizar as bibliotecas FileSystem e Winston do Node.js
* Utilizar array methods como map, filter, find, slice e sort
* Utilização de funções assíncronas através do async/await
* Utilização do try/catch
* Desenvolver endpoints
* Gravação de logs
* Validar campos


## Construído com

* JavaScript
* Node.js
* Express - Framework para Node.js
* [Prettier](https://prettier.io/) - Formatador de código

## Resultado

### Criação
![GIF do POST](https://github.com/DuhBorba/grades-control-api/blob/master/demo-POST.gif)

### Atualização
![GIF do PUT](https://github.com/DuhBorba/grades-control-api/blob/master/demo-PUT.gif)

### Deleção
![GIF do DELETE](https://github.com/DuhBorba/grades-control-api/blob/master/demo-DELETE.gif)

### Consulta por ID
![GIF do GET id](https://github.com/DuhBorba/grades-control-api/blob/master/demo-GET-id.gif)

### Consulta a nota total do aluno de determinada matéria
![GIF do GET total](https://github.com/DuhBorba/grades-control-api/blob/master/demo-GET-total.gif)

### Consulta a média de determinada matéria e tipo
![GIF do GET average](https://github.com/DuhBorba/grades-control-api/blob/master/demo-GET-average.gif)

### Consulta os 3 melhores grades de determinada matéria e tipo
![GIF do GET top 3](https://github.com/DuhBorba/grades-control-api/blob/master/demo-GET-top3.gif)

## Autores

* [Eduardo Luis Borba](https://github.com/DuhBorba) :rocket:

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes
