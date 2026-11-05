<!-- Guia de Instalação: PostgreSQL e pgAdmin (Turma 5, Módulo 1, Semana 9).
     Fonte: este markdown. O PDF publicado no Google Drive é gerado dele com o mesmo
     pipeline do handout (marked + Chrome headless, CSS do scripts/build-handout.py). -->

# Guia de Instalação: PostgreSQL, pgAdmin e DBeaver

> **Objetivo:** ao fim deste guia, o PostgreSQL está instalado, o pgAdmin abre e conecta ao servidor local, e o Query Tool executa SQL.
> **Duas rotas:** instalação local (Windows, macOS ou Linux) ou Docker, em qualquer sistema. Uma das duas basta.
> **Clientes:** o pgAdmin é o cliente usado nas aulas; o DBeaver, gratuito e multiplataforma, é alternativa para se conectar e visualizar o banco (seção 7).
> **Tempo estimado:** 20 a 30 minutos.
> As senhas usadas aqui são exemplos de aula. Qualquer valor serve, desde que seja anotado.

## 1. Antes de começar

1. Escolher a rota: **local** (seções 2 a 4, conforme o sistema) ou **Docker** (seção 5)
2. Reservar cerca de 1 GB de disco e acesso de administrador da conta
3. Ter em mãos onde anotar a **senha do usuário `postgres`**: ela é pedida em toda conexão do curso

## 2. Windows (instalação local)

1. Acessar <https://www.postgresql.org/download/windows/> e baixar o instalador da EnterpriseDB (EDB)
2. Executar o instalador:
   * Manter a porta **5432**
   * Definir a senha do usuário `postgres` e **anotar** (exemplo do guia: `senai123`)
   * Locale padrão do sistema
3. Na seleção de componentes, manter **PostgreSQL Server** e **pgAdmin 4**; o Stack Builder pode ser ignorado (botão de pular no fim)
4. Concluir e abrir o **pgAdmin** pelo menu Iniciar
5. Na primeira execução, o pgAdmin pede uma **master password**, que protege as senhas salvas dentro do próprio aplicativo. Definir uma e anotar: é local do pgAdmin, diferente da senha do servidor
6. Na árvore à esquerda, expandir **Servers > PostgreSQL**, informar a senha do `postgres` e confirmar a conexão

## 3. macOS (Homebrew)

1. Se o Homebrew não estiver instalado, seguir as instruções em <https://brew.sh>
2. Instalar e iniciar o servidor:

```bash
brew install postgresql@18
brew services start postgresql@18
```

3. No macOS, o usuário inicial do banco tem o nome do usuário do sistema. Criar o usuário do curso e definir a senha dele:

```bash
createuser -s postgres
psql -U postgres -c "ALTER USER postgres PASSWORD 'senai123';"
```

4. Instalar o pgAdmin: baixar o `.dmg` em <https://www.pgadmin.org/download/pgadmin-4-macos/> e arrastar o aplicativo para Aplicativos
5. Na primeira execução, definir a **master password** do pgAdmin (local do aplicativo, diferente da senha do servidor)

## 4. Linux (Ubuntu/Debian)

1. Instalar e ativar o servidor:

```bash
sudo apt update && sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable --now postgresql
```

2. Definir a senha do `postgres`:

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'senai123';"
```

3. Instalar o pgAdmin pelo repositório apt próprio, com as instruções de <https://www.pgadmin.org/download/pgadmin-4-apt/>, ou usar o pgAdmin via Docker (seção 5, passo 3)

## 5. Alternativa Docker (qualquer sistema)

Serve como rota completa (servidor e pgAdmin) ou só para o pgAdmin, quando o servidor já existe local.

1. Subir o servidor PostgreSQL (o valor de `POSTGRES_PASSWORD` é a senha do `postgres`):

```bash
docker run --name pg-aula \
  -e POSTGRES_PASSWORD=senai123 \
  -p 5432:5432 \
  -d postgres:18
```

2. Confirmar que o container está no ar:

```bash
docker ps
```

3. Se o pgAdmin não estiver instalado localmente, subir o dele em container e acessar `http://localhost:5050` no navegador (usuário e senha são os definidos em `PGADMIN_DEFAULT_EMAIL` e `PGADMIN_DEFAULT_PASSWORD`):

```bash
docker run --name pgadmin-aula \
  -p 5050:80 \
  -e PGADMIN_DEFAULT_EMAIL=aluno@senai.br \
  -e PGADMIN_DEFAULT_PASSWORD=senai123 \
  -d dpage/pgadmin
```

4. Para encerrar e retomar nos próximos dias: `docker stop pg-aula` e `docker start pg-aula`

## 6. Conectar o servidor no pgAdmin

1. No pgAdmin, clicar com o botão direito em **Servers** e escolher **Register > Server**
2. Aba **General**: preencher o nome, por exemplo `curso`
3. Aba **Connection**:

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Port | `5432` |
| Username | `postgres` |
| Password | a senha definida na instalação |
| Save password | marcado, se a master password estiver configurada |

4. Salvar: o servidor aparece na árvore, conectado

## 7. Cliente alternativo: DBeaver

O DBeaver Community é gratuito, roda em Windows, macOS e Linux, e conecta ao mesmo servidor do curso, inclusive ao subido por Docker. Vale ter os dois instalados: o pgAdmin é o das aulas, e o DBeaver serve para explorar o banco com outra interface.

### 7.1 Instalação

1. Baixar a edição Community em <https://dbeaver.io/download/>:
   * **Windows:** instalador `.exe`
   * **macOS:** imagem `.dmg` (ou `brew install --cask dbeaver-community`)
   * **Linux:** pacote `.deb` ou `.rpm`, ou `sudo snap install dbeaver-ce`
2. Instalar e abrir o DBeaver

### 7.2 Conexão com o servidor do curso

1. No menu **Database**, escolher **New Database Connection** e selecionar **PostgreSQL**
2. Preencher a aba **Main** com os mesmos dados da seção 6:

| Campo | Valor |
|---|---|
| Server Host | `localhost` |
| Port | `5432` |
| Database | `postgres` |
| Username | `postgres` |
| Password | a senha definida na instalação |
| Save password | marcado, para não repetir a cada conexão |

3. Clicar em **Test Connection**. Na primeira conexão, o DBeaver oferece baixar o driver JDBC do PostgreSQL: é o comportamento normal, basta aceitar o download (exige internet)
4. Concluir com **Finish**: a conexão aparece no painel **Database Navigator**

### 7.3 Visualizar o banco

1. No **Database Navigator**, expandir a conexão > **Databases** > `postgres` > **Schemas** > `public` > **Tables**: essa árvore é a estrutura do banco, o esquema
2. Dar duplo clique em uma tabela e abrir a aba **Data**: as linhas da tabela, a instância
3. Clicar com o botão direito em **public** e escolher **View Diagram**: o DBeaver desenha o diagrama de entidades das tabelas do schema, na notação Crow's Foot usada no curso
4. O editor de SQL abre em **SQL Editor > New SQL Editor**: as mesmas consultas do Query Tool do pgAdmin funcionam nele

O banco `loja_virtual`, criado em aula, aparece na mesma árvore depois de criado, com as tabelas das próximas semanas.

## 8. Verificação final

Concluir a instalação com os quatro itens abaixo confirmados:

1. O servidor aparece conectado na árvore do pgAdmin
2. O **Query Tool** abre (botão direito no servidor > Query Tool)
3. A consulta `SELECT version();` devolve a versão do PostgreSQL
4. A senha do `postgres` está anotada em lugar seguro

## 9. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Erro de porta 5432 em uso na instalação | Um PostgreSQL já instalado, ou container Docker já criado | Procurar o existente (Serviços no Windows, `docker ps`) e usá-lo, em vez de instalar outro |
| pgAdmin não conecta: senha inválida | Senha do servidor digitada no lugar errado, ou master password confundida com a senha do `postgres` | A master password abre o cofre do pgAdmin; a do servidor é a definida na instalação |
| Senha do `postgres` esquecida | Anotação perdida | Na rota Docker, remover o container (`docker rm -f pg-aula`) e criá-lo de novo; na local, reinstalar ou pedir ajuda no atendimento da aula |
| Docker: "cannot connect to the Docker daemon" | O Docker Desktop (ou o serviço) não está iniciado | Abrir o Docker Desktop e aguardar o status de execução |
| DBeaver: "Download driver files?" na primeira conexão | Comportamento normal: o driver JDBC é baixado por SGBD, uma única vez | Aceitar o download, com internet ligada |
| DBeaver não lista tabelas em `public` | O banco recém-instalado ainda não tem tabelas | Normal antes das aulas de DDL; o `loja_virtual` nasce vazio também |
