Esta é uma aplicação basica feita com NodeJS e TypeScript como exercicio ligado a uma bibloteca simples onde o usuário consegue fazer o CRUD completo pelos livros e também no próprio usuário.

É necessário o usuário candidatar-se para criar, atualizar e eliminar qualquer livro publicado no sistema.

Para copiar o projeto, utilize os comandos:

  # Clonar o repositório
  ❯ git clone https://github.com/zayonet/sample_book_backend.git

  # Entrar no diretório
  ❯ cd sample-book-backend


Para instalar as dependências e iniciar o projeto, você pode utilizar o Yarn ou NPM:

Utilizando yarn

  # Instalar as dependências
  ❯ yarn

  # Iniciar o projeto
  ❯ yarn dev

Utilizando npm

PS: Caso utilize o NPM, apaque o arquivo yarn.lock para ter todas as dependências instaladas da melhor forma.

  # Instalar as dependências
  ❯ npm install

  # Iniciar o projeto
  ❯ node run dev

🚀 Configurando banco de dados

Utilizou-se o banco de dados MySQL através de TypeORM. 

para configurar o nosso orm, basta criar um arquivo e passar as seguintes configurações

{
  {
  "type": "mysql",
  "host": "localhost",
  "port": 3306, //a porta do banco de dados 
  "username": "root", //nome do usuario de banco de imagem
  "password": "", //senha de banco de imagem no caso se tiver
  "database": "sample_books_project", //Nome do seu banco de imagem
  "synchronize": true,
  "logging": false,
  "entities": [
     "src/models/*.ts"
  ],
  "migrations": [
     "src/database/migration/*.ts"
  ],
  "cli": {
     "entitiesDir": "src/models",
     "migrationsDir": "src/database/migration"
  }
}