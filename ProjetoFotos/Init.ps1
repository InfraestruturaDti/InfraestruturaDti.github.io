
try {
    Invoke-Expression -Command "git pull"
    
    # Connect-ExchangeOnline
    Connect-MgGraph 
    Connect-AzureAD
    # Listar usuarios ativos
    Invoke-Expression -Command ".\ScriptPs1\ListarUser.ps1"
    # Baixar fotos dos usuarios
    Invoke-Expression -Command ".\ScriptPs1\ExportFotos.ps1"
    # atualizar variável de fotos
    Invoke-Expression -Command ".\ScriptPs1\AtualizarVarFotos.ps1"


}
catch {
    <#Do this if a terminating exception happens#>
} finally {
}