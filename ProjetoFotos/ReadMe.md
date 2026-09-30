# Projeto Fotos

Mural com as fotos dos colaboradores da dti. A página mostra uma grade de fotos que vão trocando sozinhas,
e cada foto tem a **borda da tribo** do colaborador. As fotos vêm do Microsoft 365 (Entra ID / Azure AD)
pelo Microsoft Graph, e a tribo vem do arquivo `ListaTribos.csv`, mantido à mão.

A página roda **localmente** (`localhost:3000`), normalmente numa máquina ligada a uma TV.

---

## Sumário

1. [Guia rápido (Facilities)](#1-guia-rápido-facilities)
2. [Instalação (primeira vez na máquina)](#2-instalação-primeira-vez-na-máquina)
3. [Como atualizar tribos e pessoas (Infra)](#3-como-atualizar-tribos-e-pessoas-infra)
4. [Como o projeto funciona](#4-como-o-projeto-funciona)
5. [Arquivos do projeto](#5-arquivos-do-projeto)
6. [Regras de nomes (tribo → arquivo → borda)](#6-regras-de-nomes-tribo--arquivo--borda)
7. [Tarefas comuns](#7-tarefas-comuns)
8. [Problemas conhecidos e solução de problemas](#8-problemas-conhecidos-e-solução-de-problemas)

---

## 1. Guia rápido (Facilities)

Abra **duas** janelas do PowerShell **como administrador**.

**PowerShell 1**: baixa as fotos e mantém tudo atualizado:

```powershell
cd c:/projetos/infraestruturadti.github.io/ProjetoFotos
./Init.ps1
```

Faça o login quando o navegador pedir (pode pedir duas vezes). A senha atual sempre estará fixada no **Windows + V**.
Deixe essa janela aberta: ela atualiza as fotos sozinha todo dia às 12:00.

**PowerShell 2**: abre a página:

```powershell
cd c:/projetos/infraestruturadti.github.io/ProjetoFotos
browser-sync start --server --files "Imagens.js"
```

O navegador abre sozinho em `localhost:3000`. Deixe em tela cheia (F11).

---

## 2. Instalação (primeira vez na máquina)

Pré-requisitos: Windows, Git e acesso ao repositório `InfraestruturaDti/InfraestruturaDti.github.io`.

```powershell
# PowerShell como administrador
Set-ExecutionPolicy Unrestricted
git clone https://github.com/InfraestruturaDti/InfraestruturaDti.github.io.git c:/projetos/infraestruturadti.github.io
cd c:/projetos/infraestruturadti.github.io/ProjetoFotos
ScriptPs1/Install.ps1
```

O `Install.ps1` instala:

| Item | Para quê |
|---|---|
| `fnm` + Node 20 | Rodar o `browser-sync` |
| `browser-sync` / `http-server` (npm global) | Servir a página e recarregar quando o `Imagens.js` mudar |
| Módulo `Microsoft.Graph` | `Connect-MgGraph`, `Get-MgUser`, `Get-MgUserPhotoContent` |
| Módulo `ExchangeOnlineManagement` | Legado (não é mais usado) |

Conta usada no login do Graph: **projetos.foto.copa@dtidigital.com.br**. Ela precisa de permissão para ler
usuários e fotos (`User.Read.All`).

---

## 3. Como atualizar tribos e pessoas (Infra)

> **Resumo:** o **único** arquivo que você edita é o `ListaTribos.csv` (e, se precisar, o `BlackList.csv`).
> Todo o resto (`Users.csv`, `FotosColabs/`, `Imagens.js`) é gerado pelos scripts.

### 3.1 Atualizar o `ListaTribos.csv`

Formato (com cabeçalho, uma pessoa por linha):

```csv
"Tribo","E-mail"
"Javalis","ademir.leal@dtidigital.com.br"
"Garoa","adnilton.santos@dtidigital.com.br"
```

- **Tribo**: só o nome da tribo (`Javalis`). O formato antigo `"Hakuna - Javalis - Rafiki"` ainda funciona:
  o script usa só o trecho **antes do primeiro `-`**.
- **E-mail**: o e-mail `@dtidigital.com.br` da pessoa. Maiúsculas e minúsculas não importam.
- Quem **não estiver** na lista aparece como **Novato**, com a borda padrão (`Curinga.png`).
- Se um e-mail aparecer duas vezes, vale a **primeira** linha.

### 3.2 Commit e push (obrigatório)

```powershell
git add ListaTribos.csv
git commit -m "atualizando lista tribos"
git push
```

> ⚠️ O `Init.ps1` roda `git reset --hard origin` ao iniciar. **Qualquer alteração que não estiver no GitHub
> é apagada**, inclusive commits locais que não foram enviados com push. Por isso a lista pode ser atualizada
> de qualquer máquina, desde que o push seja feito.

### 3.3 Aplicar na TV

- **Automático:** às 12:00 o `Init.ps1` faz `git pull` e roda o fluxo de novo.
- **Na hora:** feche a janela do `Init.ps1` (Ctrl+C) e rode `./Init.ps1` de novo.

### 3.4 Onde mais as pessoas "moram"

| Onde | Precisa editar? | Observação |
|---|---|---|
| `ListaTribos.csv` | **Sim** | Define a tribo de cada pessoa. |
| `BlackList.csv` | Só se precisar | Contas que **nunca** devem aparecer (bots, salas, contas de serviço). |
| `Bordas.js` + `Bordas/*.png` | Só quando **criar uma tribo nova** | Veja [7.1](#71-adicionar-uma-tribo-nova). |
| `Users.csv` | Não | Gerado pelo `ListarUser.ps1`: todos os usuários ativos do AD. |
| `FotosColabs/` | Não | Gerado pelo `ExportFotos.ps1`. |
| `Imagens.js` | Não | Gerado pelo `AtualizarVarFotos.ps1`. |
| Entra ID / Azure AD | Fora do projeto | Se a pessoa não tem foto ou a conta está desativada, ela não aparece. |

**Conferência recomendada** depois de atualizar a lista, para achar quem vai cair como Novato ou e-mails
que não existem no AD:

```powershell
cd c:/projetos/infraestruturadti.github.io/ProjetoFotos
. .\ScriptPs1\Tribos.ps1
$mapa  = Get-MapaTribos
$users = Import-Csv .\Users.csv
$bl    = (Import-Csv .\BlackList.csv).UserPrincipalName
# Ativos no AD sem tribo (vão aparecer como Novato):
$users.UserPrincipalName | Where-Object { -not $mapa.ContainsKey($_) -and $bl -notcontains $_ }
# Na lista, mas não estão ativos no AD (erro de digitação ou desligados):
$mapa.Keys | Where-Object { $users.UserPrincipalName -notcontains $_ }
```

> O `Users.csv` só fica atualizado depois de rodar o `ListarUser.ps1` (ou o `Init.ps1`).

---

## 4. Como o projeto funciona

```
                 ┌──────────────────────── Init.ps1 ─────────────────────────┐
 Entra ID  ──►   │ 1. Connect-MgGraph                                        │
 (Graph)         │ 2. git fetch + git reset --hard origin                    │
                 │ 3. ListarUser.ps1       ──► Users.csv                     │
 ListaTribos ──► │ 4. ExportFotos.ps1      ──► FotosColabs/<Tribo>-<nome>.jpg│
 BlackList   ──► │ 5. AtualizarVarFotos.ps1──► Imagens.js                    │
                 │ 6. loop: todo dia às 12:00 → git pull + passos 3 a 5      │
                 └───────────────────────────────────────────────────────────┘
                                             │ (browser-sync vê o Imagens.js mudar)
                                             ▼
                 index.html + script.js + Bordas.js ──► localhost:3000
```

### Passo a passo

1. **`ListarUser.ps1`**: busca no Graph todos os usuários com `accountEnabled = true`, `userType = Member` e
   UPN terminando em `@dtidigital.com.br`. Salva no `Users.csv`.
2. **`ExportFotos.ps1`**:
   - Aos **sábados, domingos e segundas** apaga **todas** as fotos de `FotosColabs/` e baixa tudo de novo.
     Serve para pegar fotos que a pessoa trocou.
   - Para cada usuário do `Users.csv`:
     - pula quem está no `BlackList.csv`;
     - descobre a tribo pelo `ListaTribos.csv` (função `Get-TriboDoUsuario` em `ScriptPs1/Tribos.ps1`);
     - monta o nome `<Tribo>-<nome-sobrenome>.jpg`;
     - se o arquivo **já existe**, não baixa de novo;
     - se não existe, baixa com `Get-MgUserPhotoContent`. Quem não tem foto gera só a mensagem
       "Unable to get photo".
   - No fim, **apaga as fotos que sobraram**: pessoas que saíram, entraram na BlackList ou **mudaram de tribo**
     (o nome antigo do arquivo não bate mais).
3. **`AtualizarVarFotos.ps1`**: lista os arquivos de `FotosColabs/` e reescreve o array `IMAGENS` em `Imagens.js`.
4. **Página** (`index.html` + `script.js`):
   - uma grade de 60 posições (12 colunas, definidas em `style.css`);
   - preenche cada posição com uma foto aleatória e sua borda;
   - a cada **500 ms** troca a foto de uma posição aleatória, com um fade;
   - não repete foto até ter mostrado todas.
   - A borda sai do nome do arquivo: o texto antes do primeiro `-` é a chave em `BORDAS` (`Bordas.js`).
     Se a chave não existir, usa `default` (`Curinga.png`).

---

## 5. Arquivos do projeto

```
ProjetoFotos/
├── Init.ps1                  # Ponto de entrada: login, sincroniza git, roda o fluxo e agenda 12:00
├── ListaTribos.csv           # [EDITAR] Tribo de cada e-mail
├── BlackList.csv             # [EDITAR] Contas que não aparecem no mural
├── Users.csv                 # [GERADO] Usuários ativos do AD
├── Imagens.js                # [GERADO] Lista de fotos usada pela página
├── Bordas.js                 # Mapa Tribo -> imagem da borda
├── Bordas/                   # PNGs das bordas (um por tribo + Curinga.png)
├── FotosColabs/              # [GERADO] Fotos baixadas
├── index.html                # Grade do mural
├── script.js                 # Lógica de exibição/troca das fotos
├── style.css                 # Layout da grade e da borda
└── ScriptPs1/
    ├── Install.ps1           # Instala dependências (1ª vez)
    ├── ListarUser.ps1        # Gera Users.csv
    ├── ExportFotos.ps1       # Baixa/remove fotos
    ├── AtualizarVarFotos.ps1 # Gera Imagens.js
    ├── Tribos.ps1            # Funções compartilhadas de tribo (Get-MapaTribos, Get-TriboDoUsuario...)
    ├── BaixarFotoAvulsa.ps1  # Baixa a foto de UMA pessoa
    └── teste.ps1             # Script de teste/rascunho (não faz parte do fluxo)
```

### `ScriptPs1/Tribos.ps1`

Toda a regra de tribo fica aqui. Os scripts carregam o arquivo com `. .\ScriptPs1\Tribos.ps1`, então
**rode sempre a partir da pasta `ProjetoFotos`**.

| Função | O que faz |
|---|---|
| `Get-MapaTribos [-Caminho]` | Lê o CSV e devolve um hashtable `e-mail → Tribo`. Não diferencia maiúsculas; vale a 1ª ocorrência. |
| `Get-TriboFormatada <texto>` | `"Hakuna - Javalis - Rafiki"` → `Hakuna`; `"Javalis"` → `Javalis`; vazio → `Novato`. Remove espaços. |
| `Get-TriboDoUsuario -MapaTribos -Email` | Junta as duas: devolve o prefixo da tribo do e-mail ou `Novato`. |

---

## 6. Regras de nomes (tribo → arquivo → borda)

```
ListaTribos.csv:  "Javalis","ademir.leal@dtidigital.com.br"
        │ Get-TriboFormatada          │ remove @dtidigital.com.br, troca "." por "-"
        ▼                             ▼
FotosColabs/     Javalis      -     ademir-leal     .jpg
                    │
script.js: nome.split('-')[0] = "Javalis"
                    ▼
Bordas.js:  BORDAS['Javalis'] = 'Bordas/Javalis.png'
```

Regras que precisam bater:

- O **nome da tribo** no CSV, a **chave** em `Bordas.js` e (por convenção) o **nome do PNG** devem ser
  iguais, **inclusive maiúsculas** (o JavaScript diferencia: `javalis` ≠ `Javalis`).
- A tribo **não pode ter `-`**, porque o `-` separa a tribo do nome. Espaços são removidos:
  `"Nova Tribo"` vira `NovaTribo`, então a chave em `Bordas.js` teria de ser `'NovaTribo'`.

Tribos atuais em `Bordas.js`: Aurora, Gaia, Garoa, Hakuna, Inari, Javalis, Origami, Rackers, Rubix, Suricatos,
e `default` (Curinga, usada por Novatos e tribos sem borda).

---

## 7. Tarefas comuns

### 7.1 Adicionar uma tribo nova

1. Coloque o PNG da borda em `Bordas/` (ex.: `Bordas/Tucanos.png`). Use o mesmo tamanho e a mesma
   transparência das outras bordas.
2. Adicione a linha em `Bordas.js`:
   ```js
   'Tucanos': 'Bordas/Tucanos.png',
   ```
3. Use exatamente `Tucanos` na coluna Tribo do `ListaTribos.csv`.
4. Faça commit e push, e rode o `Init.ps1` de novo.

### 7.2 Mudar a tribo de alguém

Edite a linha da pessoa no `ListaTribos.csv`, faça commit e push. Na próxima execução, a foto é baixada
com o nome novo e a antiga é apagada.

### 7.3 Esconder alguém do mural

Adicione o e-mail no `BlackList.csv` (coluna `UserPrincipalName`), faça commit e push.

### 7.4 Atualizar a foto de uma pessoa (sem esperar o fim de semana)

Opção A: apague o `.jpg` da pessoa em `FotosColabs/` e rode o fluxo (ou espere as 12:00).

Opção B: use o script avulso. Edite `$user` em `ScriptPs1/BaixarFotoAvulsa.ps1` e, na pasta `ProjetoFotos`:

```powershell
.\ScriptPs1\BaixarFotoAvulsa.ps1
.\ScriptPs1\AtualizarVarFotos.ps1   # só se for uma pessoa que ainda não estava no mural
```

Opção C (manual): baixe pelo link abaixo, trocando o e-mail, e salve como `<Tribo>-<nome-sobrenome>.jpg`:

```
https://dtidigital.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=EMAIL_DO_COLAB
```

### 7.5 Mudar o horário da atualização automática

Altere `$horaAlvo` no `Init.ps1` (formato `HH:mm`).

### 7.6 Mudar a velocidade ou o tamanho da grade

- Velocidade da troca: o `500` do `setInterval` em `script.js` (em milissegundos).
- Colunas: `grid-template-columns` em `style.css`.
- Quantidade de posições: os `<div class="grid-item">` em `index.html`.

---

## 8. Problemas conhecidos e solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Minha alteração no CSV sumiu | O `Init.ps1` roda `git reset --hard origin` | Faça commit **e push** antes de rodar. |
| Pessoa aparece com borda Curinga | E-mail não está no `ListaTribos.csv`, ou a tribo não existe em `Bordas.js` | Confira o e-mail e a chave (maiúsculas). |
| Pessoa não aparece | Sem foto no M365, conta desativada, na BlackList ou e-mail fora de `@dtidigital.com.br` | Veja a mensagem "Unable to get photo" no log do `ExportFotos`. |
| Foto nova do colaborador não aparece | O arquivo já existe e só é baixado de novo de sábado a segunda | Veja [7.4](#74-atualizar-a-foto-de-uma-pessoa-sem-esperar-o-fim-de-semana). |
| Foto com nome `-nome.jpg` (sem tribo) | Bug antigo do fallback "Novato", já corrigido | Rode o `ExportFotos.ps1`: o arquivo é refeito como `Novato-nome.jpg` e o antigo é apagado. |
| Erro "Tribos.ps1 não encontrado" | Script rodado fora da pasta `ProjetoFotos` | `cd` para `ProjetoFotos` antes. |
| Página não recarrega | `browser-sync` não está rodando | Rode o comando do PowerShell 2 de novo. |
| Login pede duas vezes | Normal: o `Connect-MgGraph` pode pedir mais de uma vez | Entre com a conta do projeto. |

Observações para quem for mexer no código:

- E-mails de outro domínio (ex.: `@dtisistemas.com.br`) no `ListaTribos.csv` **nunca** são usados, porque o
  `ListarUser.ps1` só busca `@dtidigital.com.br`.
- O `ExportFotos.ps1` procura o ID pelo campo `mail` (`Get-MgUser -Filter "mail eq ..."`). Se o `mail` de
  alguém for diferente do UPN, a foto não é baixada.
- Os scripts usam caminhos relativos (`.\FotosColabs`, `.\ScriptPs1\...`), então rode sempre a partir de `ProjetoFotos/`.
- As fotos (`FotosColabs/`) **não** devem ser commitadas; elas são geradas em cada máquina.
