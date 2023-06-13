#Instalações necessarias
#Instalar tbm o RSat em configurações->recursos acicionais-> adicionar -> RSAT active directory -> instalar
#Install-Module ExchangeOnlineManagement
#Import-Module ExchangeOnlineManagement
#Install-Module Microsoft.Graph.User
#Import-Module Microsoft.Graph.User

#Inicializando conexões
Connect-ExchangeOnline
Connect-MgGraph -Scopes User.ReadWrite.All, Organization.Read.All
Connect-AzureAD
Unblock-File C:/Remove_User_All_GroupsV2.ps1

# Criar uma matriz vazia de e-mails
$emailArray = @()

# Adicionar e-mails à matriz
$emailArray += "yukari.kajimoto@dtidigital.com.br"
$emailArray += "yuri.santos@dtidigital.com.br"
$emailArray += "yuricka.takahashi@dtidigital.com.br" 

# Acessar e exibir os e-mails na matriz
Out-File -FilePath "c:/logScript.txt"
foreach ($email in $emailArray) {
    # Definir a SKU da licença que deseja remover
    $licencaSKU = "3b555118-da6a-4418-894f-7df1e2096870"    
    #Adicionando licença
    
    Set-MgUserLicense -UserId $email -AddLicenses @{SkuId = $licencaSKU } -RemoveLicenses @()
    if ($?) {
        #Verifica se a caixa de correio foi criada
        $caixaDeCorreio = $null
        while (-not $caixaDeCorreio) {
            $caixaDeCorreio = Get-Mailbox -Identity $email -ErrorAction SilentlyContinue
            if (-not $caixaDeCorreio) {
                Start-Sleep -Seconds 5 # Aguardar 5 segundos antes de verificar novamente
                Write-Host "AGUARDANDO A CAIXA DE EMAIL SER CRIADA"  
            }
        }
        Write-Host "Licença atribuida com sucesso para o usuário: $email"
        "Licença atribuida com sucesso para o usuário: $email" | Out-File -FilePath "c:/logScript.txt" -Append
        # remocao das licenças
        c:\Remove_User_All_GroupsV2.ps1 -Identity $email -IncludeAADSecurityGroups -IncludeOffice365Groups        
        if ($?) {
            Write-Host "A remoção de grupos foi executada com sucesso." 
            "A remoção de grupos foi executada com sucesso."  | Out-File -FilePath "c:/logScript.txt" -Append
        }
        else {
            Write-Host "Ocorreu um erro durante a execução de remoção." 
            "Ocorreu um erro durante a execução de remoção." | Out-File -FilePath "c:/logScript.txt" -Append
        }
        # Verificar se o usuário possui a licença especificada
        Get-MgUserLicenseDetail -UserId $email
        if ($? -contains $licencaSKU) {
            # Remover a licença especificada do usuário
            Set-MgUserLicense -UserId $email -RemoveLicenses @($licencaSKU) -AddLicenses @{}
            Write-Host "Licença removida com sucesso para o usuário: $email"
            "Licença removida com sucesso para o usuário: $email" | Out-File -FilePath "c:/logScript.txt" -Append
}
    }
    else {
        Write-Host "Ocorreu um erro durante atribuição da licença para $email"
        "Ocorreu um erro durante atribuição da licença para $email" | Out-File -FilePath "c:/logScript.txt" -Append
    }
    Write-Host "-----------------------------------------------------------------------------------"
    "----------------------------------------------------------------------" | Out-File -FilePath "c:/logScript.txt" -Append
}
