#Install-Module Microsoft.Graph.Teams
#Import-Module Microsoft.Graph.Users
#Import-Module Microsoft.Graph.Teams
Connect-MgGraph
$photoDirectory = ".\FotosColabsBaixados"

$emails = @(
	"cristianne.rozendo@dtidigital.com.br",
	"davi.teixeira@dtidigital.com.br",
	"rebeca.candido@dtidigital.com.br"
	 
	)

foreach ($userEmail in $emails) {
	Write-Output "Obtendo foto de "$userEmail
	        # Obtenha o ID do usuário pelo endereço de e-mail
			$userId = (Get-MgUser -Filter "mail eq '$($userEmail)'").Id
			$nameFile = $userEmail.Replace("@dtidigital.com.br", "").Replace(".", "-")
			try {
				Get-MgUserPhotoContent -UserId $userId -OutFile ("{0}\{1}.jpg" -f $photoDirectory, $NameFile) -ErrorAction Stop
			}catch {
				Write-Host "Unable to get photo for user $($userEmail)"
			}
	}

