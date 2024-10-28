Configurar o script a rodar todo dia:

    Abrir o Agendador de Tarefas:

    Pressione Win + R, digite taskschd.msc e pressione Enter.
    Criar uma Nova Tarefa:

    No painel à direita, clique em "Criar Tarefa...".
    Configurar a Tarefa:

    Geral:

    Dê um nome para a tarefa.
    Marque "Executar com privilégios mais altos" se necessário.
    Disparadores:

    Clique em "Novo...".
    Configure para iniciar a tarefa "Diariamente" e escolha a hora desejada.
    Ações:

    Clique em "Novo...".
    Em "Programa/script", digite powershell.
    Em "Adicionar argumentos (opcional)", digite o caminho do init:
    -File "C:\ProjetoFotos\Init.ps1"

    Instalar e configurar o github

    
Iniciar e exibir a pagina:
    Abra o powerShell
    Executar o comando 'Set-ExecutionPolicy Unrestricted' 
    execute o ScriptPs1/Install.ps1
    Instalar node.js
        winget install Schniz.fnm
        fnm env --use-on-cd | Out-String | Invoke-Expression
        fnm use --install-if-missing 20
    Configurar o path do node.js

    para iniciar a pagina web, Abra o cmd e Navegue até o diretório do seu projeto e execute:
        browser-sync start --server --files "Imagens.js"
    