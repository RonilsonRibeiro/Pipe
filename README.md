# Projeto: Ronilson Ribeiro

## Considerações Iniciais

Antes de iniciar gostaria de dizer que este foi o meu primeiro contato com Cypress, então pode ser que eu não tenha utilizado as melhoras práticas da ferramenta, mas tentei utilizar o conhecimento adquirido em outros frameworks.

#Como acessar e rodar os testes:

## Instalando o Node

Fazer o download e instalação do Node. O instalador pode ser encontrado no site https://nodejs.org/en/download/.


## Instalando o Cypress

Instale o Cypress abrindo um prompt de comando e utilizando o npm que deve ter sido instalado junto com o Node. (Este processo deverá ser feito para o projeto Frontend e Backend)

```sh
cd /caminho/do/projeto
npm install cypress --save-dev
```

## Rodando um teste

## Frontend

Acesse a pasta do projeto
```sh
cd /caminhoDoProjeto/Pipefy/frontend
```
## Backend

Como o nome do pipe é único, pode ser necessário alterar o campo "name" do pipe na pasta:
```sh
cd /caminhoDoProjeto/Pipefy/backend/fixtures/testdata.json
```

Acesse a pasta do projeto
```sh
cd /caminhoDoProjeto/Pipefy/backend
```

Rode o comando:
```sh
npx cypress open
```

O Cypress será aberto e irá mostrar o teste disponível, a primeira execução pode ser um pouco mais lenta.