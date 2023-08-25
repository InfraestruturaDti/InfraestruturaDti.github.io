Connect-AzureAD
#Lendo o arquivo txt
# Atualizar listagem dos emails dos grupos no arquivo "ListaGrupos.txt"; e executar o script. Talvez seja necessario atualizar o endereço do aquivo no script.
$Text = Get-Content -Path "PowerShell\Exclusão de grupos\ListaGrupos.txt"
#Transformando as linhas do arquivo em um array 
$Text.GetType() | Format-Table -AutoSize
foreach($element in $Text){

    $grup = Get-AzureADGroup -SearchString $element
    Remove-AzureADGroup -ObjectId $grup.ObjectId
    # Write-Output $element
}