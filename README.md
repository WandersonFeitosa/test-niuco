
<h1>Teste técnico Niuco</h1>

  

<p  align="center">

  

<img  src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>

  

<img  src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>

  

<img  src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white"/>

  

<img  src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>

  

<img  src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"/>

  

</p>

  

### Tópicos

  

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

  

:small_blue_diamond: [Configurando o projeto](#configurando-o-projeto)

  

:small_blue_diamond: [Funcionamento do projeto](#funcionamento-do-projeto)

  

## Descrição do projeto

  

<p  align="justify">

  

A aplicação tem o propósito de formatar dados a partir de um formato pré definido vindo de uma API externa, transformando algumas informações como o estado de pagamento do usuário, o status de ativação da sua conta e a transformação da data.

  

</p>

  

## Configurando o Projeto

  

**Variáveis de ambiente:**

  

Para que a aplicação rode da maneira esperada é necessário atribiur algumas variáveis de ambiente ao projeto a princípio através da criação do arquivo .env na pasta raiz do projeto ou da maneira que mais atender a situação atual.

  

As variáveis de ambiente necessárias para a aplicação estão mencionadas no arquivo .env.example localizado também na pasta raiz do projeto, assim como na lista abaixo

  

```

#(OPCIONAL) Porta que o servidor irá rodar, caso não seja informado, será utilizado a porta 3000

PORT=

  

#URL da API de usuários, caso não seja informado, será utilizado a URL http://localhost:3000

USER_API_URL=""

  

#Domínios de email que não serão censurados durante a listagem de usuários, separe por vírgula, ex: "niuco.com.br,niuco.com"

ALLOWED_DOMAINS=""

```

  

**Dependências:**

  

A aplicação possui como dependência o Node em versões 18.x ou superirores, após isso basta executar o comando npm install no seu terminal na pasta do projeto para instalação das bibliotecas do projeto

  

```
npm install
```

A aplicação possui dependência de uma API para realizar suas requisições essa API pode ser gerada utilizando um pacote do npm diretamente pela sua máquina utilizando os próprios scripts da aplicação:

```bash
npm  install  -g  json-server

npm  start:mock
```

  

> _Um ponto que vale atenção que ao rodar utilizando o pacote ele irá executar na porta 3000 então caso a aplicação esteja rodando nessa
> mesma porta será necessário definir outra porta para a aplicação_

  

Uma alternativa também é utilizar um endpoit externo disponibilizado para essa API, que pode ser encontado na url:

  

```bash
http://34.46.238.227/v1/niuco-mock
```

  

<br/>

  

**Inicialização:**

  

Para inicar o projeto no modo desenvolvimento utilize o comando npm run start:dev, através disso a aplicação iniciará no modo _watch_ que permite que ela seja reinicada toda vez que tiver uma atualização dentro dos seus arquivos

  

```
npm run start:dev
```

  

<br/>

  

**Deploy:**

  

Para rodar a aplicação de modo otimizado para produção, realize primeiro um build da aplicação utilizando o npm run build e na sequência execute o npm run start, isso irá inicializar a aplicação de modo otimizado para produção

  

```
npm run build
```

  

```
npm run start
```

  

## Funcionamento do projeto

  

A aplicação pode ser integrada através através de chamadas HTTP, em rotas que são gerenciadas pelo [NestJS](https://nestjs.com/).

  

As rotas da API podem ser encontradas na domínio onde a aplicação está rodando no caminho /doc, essas rotas são controladas através da biblioteca [Swagger](https://swagger.io/) para facilitar o processo de documentação das rotas

  

Dentre suas principais funções a aplicação tem como:

  

  

## Listagem de usuários formatados

  

A aplicação implementa uma integração com a API Mock para coletar dados de usuários cadastrados, aplicar as regras de formatação necessárias e exibir o resultado final. Abaixo estão as principais funcionalidades implementadas: 

1.  **Coleta de Dados:** A aplicação se integra com a API externa para obter informações dos usuários.

2.  **Formatação dos Usuários:** Cada usuário possui as seguintes informações: 

-  **ID**
-  **Nome**
-  **Email (ofuscado conforme regra abaixo)**
-  **Data de última atividade (em formato ISO-8601)**
-  **Flag para indicar se o usuário é pagante ou não**
-  **Flag para determinar se o usuário está ativo ou não**

  

3.  **Regras de Formatação:**

-  **Status:** O usuário é considerado ativo se o campo `status` for igual a `enabled`. Caso contrário, ele é considerado inativo.

-  **Premium:** Determinado pelo campo `role`:

-  `viewer` e `system` -> `false`

-  `editor` e `admin` -> `true`

- Usuários inativos nunca são premium, independente do `role`.

-  **Data de Última Atividade:** Convertida para ISO-8601.

-  **Ofuscação de Email:** Aplicada para domínios diferentes de `niuco.com.br`, mostrando apenas os primeiros e últimos dois caracteres do alias e o domínio.

  

### Exemplos de Ofuscação de Email:

  

-  **Email com domínio `niuco.com.br`:**

  

- Original: joao.silva@niuco.com.br

- Ofuscado: joao.silva@niuco.com.br

  

-  **Email com domínio diferente de `niuco.com.br`:**

  

- Original: maria.oliveira@gmail.com

- Ofuscado: ma\*\*\*\*ia@gmail.com

    

##