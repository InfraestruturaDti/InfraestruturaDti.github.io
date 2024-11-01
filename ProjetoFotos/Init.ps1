
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
    
    $horaAlvo = "15:00"  # Defina o horário desejado no formato HH:mm

while ($true) {
     $horaAtual = (Get-Date).ToString("HH:mm")
     Write-Output "Verificação de horario: $horaAtual, de $horaAlvo"
     
     if ($horaAtual -eq $horaAlvo) {
        Write-Output "Executando fluxo: $horaAtual"
        # Aguarde um minuto para evitar múltiplas execuções no mesmo minuto
        Start-Sleep -Seconds 60
        Invoke-Expression -Command "git pull"
        # Listar usuarios ativos
        Invoke-Expression -Command ".\ScriptPs1\ListarUser.ps1"
        # Baixar fotos dos usuarios
        Invoke-Expression -Command ".\ScriptPs1\ExportFotos.ps1"
        # atualizar variável de fotos
        Invoke-Expression -Command ".\ScriptPs1\AtualizarVarFotos.ps1"
    }else {
        Start-Sleep -Seconds 50
        <# Action when all if and elseif conditions are false #>
    }
    
}


}
catch {
    <#Do this if a terminating exception happens#>
} finally {
}