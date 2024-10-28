
try {
    
    # Connect-ExchangeOnline
    Connect-MgGraph 
    Connect-AzureAD

    Invoke-Expression -Command "git pull"
    # Listar usuarios ativos
    Invoke-Expression -Command ".\ScriptPs1\ListarUser.ps1"
    # Baixar fotos dos usuarios
    Invoke-Expression -Command ".\ScriptPs1\ExportFotos.ps1"
    # atualizar variável de fotos
    Invoke-Expression -Command ".\ScriptPs1\AtualizarVarFotos.ps1"
    
    $horaAlvo = "4:00"  # Defina o horário desejado no formato HH:mm

while ($true) {
    $horaAtual = (Get-Date).ToString("HH:mm")
    
    if ($horaAtual -eq $horaAlvo) {
        # Coloque aqui o código que deseja executar
        Write-Output "Executando o código às $horaAtual"
        
        # Aguarde um minuto para evitar múltiplas execuções no mesmo minuto
        Start-Sleep -Seconds 60
        Invoke-Expression -Command "git pull"
        # Listar usuarios ativos
        Invoke-Expression -Command ".\ScriptPs1\ListarUser.ps1"
        # Baixar fotos dos usuarios
        Invoke-Expression -Command ".\ScriptPs1\ExportFotos.ps1"
        # atualizar variável de fotos
        Invoke-Expression -Command ".\ScriptPs1\AtualizarVarFotos.ps1"
    }
    
    # Aguarde alguns segundos antes de verificar novamente
    Start-Sleep -Seconds 10
}


}
catch {
    <#Do this if a terminating exception happens#>
} finally {
}