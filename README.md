# Users API

API de usuários em NestJS, TypeORM e Postgres.

## Arquitetura e Recursos
* <a href="https://www.macoratti.net/21/05/net_onion1.htm" target="_blank">Onion Architecture</a> e injeção de dependência, garantindo modularidade, testabilidade e desacoplamento;
* Docker para a containerização do banco de dados;
* <code>class-validator</code> para as validações de DTOs;
* Helpers para padronizar status de requisições HTTP.

## Instalação

* Abra o arquivo <code>.env-example</code>. Ele deve estar desta forma:
  ```bash
  DB_HOST=localhost
  DB_PORT=5435
  DB_USERNAME=CHANGE-ME
  DB_PASSWORD=CHANGE-ME
  DB_DATABASE=CHANGE-ME
  ```
* Renomeie o arquivo para <code>.env</code> e troque todos os valores <code>CHANGE-ME</code> das variáveis de acordo com sua preferência.

* Execute o seguinte comando:
  ```bash
  $ npm install
  ```

* Baixe e instale o <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> caso não o tenha em sua máquina.

* Deixe o Docker Desktop ativo e em segundo plano, certificando-se de que não há nenhum contêiner ou imagens em execução.

* Execute o seguinte comando:
  ```
  docker compose up --build
  ```

## Executando a aplicação
```bash
# development
$ npm run start

# watch mode
$ npm run start:debug
```

