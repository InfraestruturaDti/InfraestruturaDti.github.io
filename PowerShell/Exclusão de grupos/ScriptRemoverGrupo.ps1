Connect-AzureAD
#Lendo o arquivo txt
$Text = Get-Content -Path C:\projetos\PowerShell\RemoverAdGroup\ListaGrupos.txt
#Transformando as linhas do arquivo em um array 
$Text.GetType() | Format-Table -AutoSize
foreach($element in $Text){
    $grup = Get-AzureADGroup -SearchString $element
    Remove-AzureADGroup -ObjectId $grup.ObjectId
    # # Write-Output $element
}