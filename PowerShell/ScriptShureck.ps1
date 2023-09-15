#Connect-MgGraph
#Import-Module Microsoft.Graph.Teams
#Defububdi remetente
$MeuEmail = "bot.tito@dtidigital.com.br"
$EmailDestinatario = "vinicius.farias@dtidigital.com.br"

#Criando o chat
$params = @{
	chatType = "oneOnOne"
	members = @(
		@{
			"@odata.type" = "#microsoft.graph.aadUserConversationMember"
			roles = @(
				"owner"
			)
			"user@odata.bind" = "https://graph.microsoft.com/v1.0/users('$MeuEmail')"
		}
		@{
			"@odata.type" = "#microsoft.graph.aadUserConversationMember"
			roles = @(
				"owner"
			)
			"user@odata.bind" = "https://graph.microsoft.com/v1.0/users('$EmailDestinatario')"
		}
	)
}
$Session = New-MgChat -BodyParameter $params
#Lendo o arquivo txt
$Text = Get-Content -Path C:\projetos\PowerShell\Roteiro.txt 
#Transformando as linhas do arquivo em um array 
$Text.GetType() | Format-Table -AutoSize
#Listando as linhas do arquivo
if ($null -eq $Session.Id) {
	Write-Output "Não foi possivel criar o chat"
}
else {
	<# Action to perform if the condition is true #>
	foreach ($element in $Text) 
	{ 
		$Mensagem = @{
			body = @{
				content = "$element"
			}
		}
		New-MgChatMessage -ChatId $Session.Id -BodyParameter $Mensagem
	}
}