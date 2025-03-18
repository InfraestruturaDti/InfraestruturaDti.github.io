Iniciar, configurar e exibir a pagina:

    Abra o power shell como administrador
    executar os comandos:
    
    'Set-ExecutionPolicy Unrestricted' 
    ScriptPs1/Install.ps1

Instalar node.js
        
        winget install Schniz.fnm
        fnm env --use-on-cd | Out-String | Invoke-Expression
        fnm use --install-if-missing 20
        Configurar o path do node.js

Instruções para executar a página:

    1- Atualize o arquivo ListaTribos.csv 
        O arquivo deve estar no seguinte formato:

        "Tribo","E-mail"
        "Gaia - Keepers","tito.chen@dtidigital.com.br"
        
    2- Abra duas instancias do powershell como administrador.
        Em uma delas, execute o arquivo ./init.ps1
        realize o login (2 vezes) utilizando o acesso do proojetos.foto.copa@dtidigital.com.br
        Na segunda, execute o comando: 
            browser-sync start --server --files "Imagens.js"
        após isso, o navegador irá abrir automaticamente uma guia com o link da pagina.
                localhost:3000
    
