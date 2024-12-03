
#  Connect-ExchangeOnline
write-host "Iniciando listaruser.ps1"
#  Connect-AzureAD
$FilePath = ".\Users.csv"
# pegando usuarios ativos
#$users = Get-MgUser -All | Select-Object DisplayName, Mail, AccountEnabled
#$users | Export-Csv -Path $FilePath -Encoding UTF8 -NoTypeInformation
# Obtenha todos os usuários
$users = Get-AzureADUser -All $true |Where-Object { $_.AccountEnabled -eq $true -and $_.UserPrincipalName.EndsWith("@dtidigital.com.br") -and $_.UserPrincipalName -notlike "*#EXT#*"}| Select-Object DisplayName, UserPrincipalName

# Exporte para CSV
$users | Export-Csv -Path $FilePath -NoTypeInformation -Encoding UTF8

write-host "Encerrando listaruser.ps1"
#Abrindo o arquivo
#Invoke-Item $filePath
