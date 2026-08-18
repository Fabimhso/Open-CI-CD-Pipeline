# Open CI/CD Pipeline

## Descricao

Este projeto nasceu como a infraestrutura de pipeline principal desenvolvida para uma grande operadora de telecomunicacoes mobile. Originalmente projetado para suportar o alto volume de entregas e testes dos servicos criticos da empresa, o projeto foi refatorado, desvinculado de qualquer regra de negocio sensivel ou dados proprietarios, e agora e disponibilizado como open source.

O objetivo deste repositorio e fornecer um boilerplate limpo, escalavel e seguro para implementacao de pipelines de Integracao Continua e Entrega Continua (CI/CD) para aplicacoes Node.js, empacotadas via Docker e orquestradas pelo GitHub Actions.

## Tecnologias e Ferramentas

- Backend: Node.js (Express)
- Testes: Jest e Supertest
- Containerizacao: Docker (baseado em Alpine Linux)
- Automatizacao e CI/CD: GitHub Actions

## Como a Pipeline Funciona

O fluxo de automacao foi desenhado para garantir a qualidade do codigo antes de qualquer promocao de ambiente. Ele atua em duas etapas principais:

1. Integracao Continua (CI): A cada Push ou Pull Request para a branch `main`, o GitHub Actions inicializa um ambiente limpo, instala as dependencias e executa a bateria completa de testes unitarios. Se algum teste falhar, a pipeline bloqueia o fluxo.
2. Entrega Continua (CD): Se a etapa de testes passar sem erros durante um evento de Push, a esteira compila uma nova imagem Docker da aplicacao e faz o push automatico para o registry de containers configurado (Docker Hub). A imagem e tagueada tanto como `latest` quanto com o SHA do commit (para permitir a facil reversao de versoes, se necessario).

## Instrucoes de Uso (Local)

### Pre-requisitos
- Node.js (versao 20 ou superior)
- Docker instalado na maquina

### Executando a Aplicacao via Node.js

Para rodar a aplicacao localmente:

```bash
npm install
npm start
```

O servidor iniciara na porta 3000. Para testar o funcionamento das rotas de integracao e saude, acesse:
- http://localhost:3000/
- http://localhost:3000/health

Para rodar a suite de testes unitarios:

```bash
npm test
```

### Executando via Docker

Para construir a imagem e roda-la localmente utilizando containers:

```bash
docker build -t open-cicd-app .
docker run -p 3000:3000 -d open-cicd-app
```

## Configuracao da Pipeline (GitHub Secrets)

Para que a pipeline do GitHub Actions consiga realizar a etapa de CD (push da imagem Docker), e obrigatorio configurar as seguintes secrets na aba Settings > Secrets and variables > Actions do seu repositorio:

- `DOCKER_USERNAME`: Seu nome de usuario no Docker Hub.
- `DOCKER_PASSWORD`: Sua senha ou Token de Acesso do Docker Hub.

## Licenca

Distribuido sob a licenca MIT. Consulte o arquivo LICENSE para obter mais informacoes.
