

# Configuração do Cypress com Arquivos de Variáveis

Este repositório contém um arquivo de configuração para o Cypress que permite usar diferentes conjuntos de variáveis de configuração dependendo do ambiente de execução. Além disso, o projeto faz uso de arquivos `hml.json` e `prod.json` na raiz do projeto para fornecer diferentes configurações para ambientes de desenvolvimento e produção.

### Pré-Requisitos

- NodeJS.
- Editor de Texto (Vscode, Atom, Notepad++, Sublime, etc...)
- NPM
- git

### Instalação

- Abra o terminal e navegue até o diretório onde deseja clonar o repositório do GitHub. Em seguida, execute o seguinte comando:
 `git clone https://github.com/gersoncdias/automacao_-cypress_api_vtex.git`
- Entre no diretório do projeto recém-clonado usando o comando: 
`cd nome-repositorio`
- Execute o seguinte comando para instalar as dependências do projeto, incluindo o Cypress: `npm i`

## Estrutura de arquivos

```
/cypress
  /config
    hml.json
    prod.json
  ...
```


## Configuração dos Arquivos de Variáveis

- Edite os arquivos hml.json e prod.json na raiz do projeto de acordo com as configurações específicas para cada ambiente.

## Configuração do Código

Certifique-se de que o arquivo cypress/cypress.config.js esteja configurado como mostrado abaixo:

```
const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const path = require('path')

function searchConfigFile(file) {
  const pathFile = path.resolve('.', 'cypress', 'config', `${file}.json`)
  return fs.readJson(pathFile)
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || 'prod'
      config = searchConfigFile(file)
      return config
    },
  },
})
```

## Execução dos Testes

- Você pode definir a variável de ambiente configFile para especificar qual conjunto de variáveis de configuração usar.

- Em ambiente de produção modo hedless
`npx cypress run --env configFile=prod`

- Em ambiente de homologação modo hedless
`npx cypress run --env configFile=hml`

- Para mudar a variavel de ambiente manualmente, voce vai precisar mudar a chamada do arquivo em `cypress.config.js`

- Para ambiente de produção em modo interativo
`const file = config.env.configFile || 'prod'`

- Para ambiente de homologação em modo interativo
`const file = config.env.configFile || 'hml'`

##  Importante:
- Antes de prosseguir, lembre-se de criar um arquivo `.gitignore` para garantir que arquivos desnecessários não sejam incluídos no repositório. 

```
/node_modules/
/cypress/config

```




