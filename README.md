## Descrição
  - Projeto feito para o processo seletivo do cidade alta para backend

## Dependencias
  - NodeJs : https://nodejs.org/en
  - NestCli : https://docs.nestjs.com/cli/overview

## Instalação
  - Clone o projeto e entre na raiz
```bash
#use
$ npm install
```

## First Steps
  - Use ```npm run seed``` para gerar os emblemas que nos foram dados no teste.
  - Em http://127.0.0.1:3000/api#/ você irá precisar criar um usuario e fazer login para receber o token para usar nas outras rotas.

## Para rodar o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Teste

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usando Docker

## observações
  - Eu poderia ter implementado em qualquer banco de dados, pois o prisma da suporte a maioria
deixei o sqlite para facilitar a avaliação.

## Implementações Adicionais
  - Todos os extras
  - Validação dados json
  - Middleware
  - Docker ( não to conseguindo rodar a seed sem dar error, sem tempo para corrijir o problema )
  - Tratamento de exceções
  - Criptografia de senhas