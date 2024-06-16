# Users API

API de usuários em NestJS, TypeORM, Postgres e Docker.

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

