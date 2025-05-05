
FACILITIES:
Abra duas instancias do powershell como administrador.
Copie os comandos abaixo, em suas respectivas jalenas do PowerShell.
PowerShell 1:

    cd c:/projetos/infraestruturadti.github.io/ProjetoFotos
    ./init.ps1

Faça login. A senha atual sempre estará fixada no Xindows + V
PowerShell 2:

    browser-sync start --server --files "Imagens.js"


INFRA:
Istruções para executar a página:

    1- Atualize o arquivo ListaTribos.csv 
        O arquivo deve estar no seguinte formato:

        "Tribo","E-mail"
        "Gaia - Keepers","tito.chen@dtidigital.com.br"
        
    1.1- Salve o arquivo e faça o commit (toda vez que for atualziado o lista tribos, o lista tribo novo deve ser commitado. cosnequentemente, a atualização do lista tribos pode ser realziada em outro dispositivo, desde que seja feito o commit após a atualziação).

    2- Abra duas instancias do powershell como administrador.
        Navegue no terminal ate a localização da pasta ProjetoFotos (comumente fica dentro de c:/projetos/infraestruturadti.github.io/ProjetoFotos)
        Em uma delas, execute o arquivo ./init.ps1
        realize o login (2 vezes) utilizando o acesso do proojetos.foto.copa@dtidigital.com.br
        Na segunda, execute o comando: 
            browser-sync start --server --files "Imagens.js"
        após isso, o navegador irá abrir automaticamente uma guia com o link da pagina.
                localhost:3000
    
alternativa para baixar foto:
https://dtidigital.sharepoint.com/_layouts/15/userphoto.aspx?size=L&username=bot.tito@dtidigital.com.br
trocar o email pelo email do colab


Instalação
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