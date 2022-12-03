# Projeto NG-CASH

## Objetivo:
  Criar uma aplicação full-stack dockerizada para que os usuários da NG-CASH possam realizar transferências internas entre si;

## Desafios:
  O principal desafio foi na hora de escolher se usaria React puro (que eu possuo um certo domínio), ou Next.Js (um framework que comecei a estudar tem menos de 2 meses),
  acabei por me desafiar e assim criei minha primeira aplicação com Next.js.

## Orgulhos:
  Com certeza meu maior orgulho foi conseguir entregar o projeto dentro do prazo com um framework relativamente novo para mim e com um tempo de trabalho de 3 - 4 horas por dia.

## Pontos a ser melhorados:
  Por estar trabalhando com um framework novo e com um tempo reduzido de horas/dia, não tive tempo para manter um código totalmente limpo como gostaria de deixar, mas ainda assim me orgulho muito do que consegui entregar.

## Stacks utilizadas:
  - Frontend:
    - React + Next.js
    - Typescript
    - Tailwind CSS
    - Axios
    - Yup + React Hook Forms
  - Backend:
    - Express
    - Typescript
    - Sequelize
    - JWT
    - Zod
  - Banco de dados:
  - PostgresSQL

## Instruções de uso:
Na pasta raiz (ng-cash), acesse o terminal e rode o comando "npm run compose:up" para subir os containers e "npm run compose:down" para parar os containers.

As portas disponibilizadas do app são:
  - Banco de dados postgres: localhost:5432
  - Servidor backend: localhost:3001
  - Servidor frontend: localhost:3000

Obs: Os dados do banco de dados são sempre resetados ao usar o comando "npm run compose:up"