#Install-Module Microsoft.Graph.Teams
#Import-Module Microsoft.Graph.Users
#Import-Module Microsoft.Graph.Teams
Connect-MgGraph
Import-Module Microsoft.Graph.Teams

$params = @{
	chatType = "oneOnOne"
	members = @(
		@{
			"@odata.type" = "#microsoft.graph.aadUserConversationMember"
			roles = @(
				"owner"
			)
			"user@odata.bind" = "https://graph.microsoft.com/v1.0/users('bot.tito@dtidigital.com.br')"
		}
		@{
			"@odata.type" = "#microsoft.graph.aadUserConversationMember"
			roles = @(
				"owner"
			)
			"user@odata.bind" = "https://graph.microsoft.com/v1.0/users('tito.chen@dtidigital.com.br')"
		}
	)
}

$Session = New-MgChat -BodyParameter $params


$Mensagem = @{
    body = @{
        content = "<b>Hello World</b>"
		contentType = 'html'
    }
}
New-MgChatMessage -ChatId $Session.Id -BodyParameter $Mensagem

