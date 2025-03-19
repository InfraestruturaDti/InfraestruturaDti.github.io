#Install-Module Microsoft.Graph.Teams
#Import-Module Microsoft.Graph.Users
#Import-Module Microsoft.Graph.Teams
Connect-MgGraph
$photoDirectory = ".\FotosColabsBaixados"

$emails = @(
"alexandre.loriggio@dtidigital.com.br",
"alexandre.maia@dtidigital.com.br",
"aline.lima@dtidigital.com.br",
"amanda.leal@dtidigital.com.br",
"anaclara.souza@dtidigital.com.br",
"ana.marcelino@dtidigital.com.br",
"analuiza.caldas@dtidigital.com.br",
"andre.batista@dtidigital.com.br",
"andressa.ederer@dtidigital.com.br",
"arthur.chagas@dtidigital.com.br",
"barbara.candido@dtidigital.com.br",
"betania.alves@dtidigital.com.br",
"bruna.rabelo@dtidigital.com.br",
"camila.rodrigues@dtidigital.com.br",
"cecilia.anjos@dtidigital.com.br",
"cibele.silva@dtidigital.com.br",
"clara.mariano@dtidigital.com.br",
"clesio.silva@dtidigital.com.br",
"denis.pereira@dtidigital.com.br",
"emanuella.ferraz@dtidigital.com.br",
"fabiana.leitao@dtidigital.com.br",
"flavio.couto@dtidigital.com.br",
"giovana.souza@dtidigital.com.br",
"glaucia.rodrigues@dtidigital.com.br",
"glaucia.maria@dtidigital.com.br",
"gleice.barros@dtidigital.com.br",
"guilherme.mendonca@dtidigital.com.br",
"gustavo.macedo@dtidigital.com.br",
"henrique.dias@dtidigital.com.br",
"ivana.menezes@dtidigital.com.br",
"jose.pinto@dtidigital.com.br",
"jose.amorim@dtidigital.com.br",
"julia.fariasilva@dtidigital.com.br",
"karen.moura@dtidigital.com.br",
"Klevison.ribeiro@dtidigital.com.br",
"lais.rodarte@dtidigital.com.br",
"leticia.vial@dtidigital.com.br",
"luana.almeida@dtidigital.com.br",
"lucas.azevedo@dtidigital.com.br",
"luciana.gomes@dtidigital.com.br",
"luis.diniz@dtidigital.com.br",
"luiz.faria@dtidigital.com.br",
"maria.zucchelli@dtidigital.com.br",
"maria.heilbuth@dtidigital.com.br",
"mariana.psantos@dtidigital.com.br",
"mariana.bernardes@dtidigital.com.br",
"marina.rezende@dtidigital.com.br",
"matheus.nolasco@dtidigital.com.br",
"melissa.ferreira@dtidigital.com.br",
"nasser.kilesse@dtidigital.com.br",
"paola.santiago@dtidigital.com.br",
"patrick.galdino@dtidigital.com.br",
"patrick.galdino@dtidigital.com.br",
"priscila.lara@dtidigital.com.br",
"priscila.desiderio@dtidigital.com.br",
"priscila.albuquerque@dtidigital.com.br",
"pryscila.martins@dtidigital.com.br",
"rafaella.paiva@dtidigital.com.br",
"raquel.branco@dtidigital.com.br",
"renata.martins@dtidigital.com.br",
"robson.freitas@dtidigital.com.br",
"rodrigo.assis@dtidigital.com.br",
"samantha.sena@dtidigital.com.br",
"sophia.mendes@dtidigital.com.br",
"soraya.quaresma@dtidigital.com.br",
"stephanie.bozzi@dtidigital.com.br",
"talita.valadares@dtidigital.com.br",
"thiago.rodrigues@dtidigital.com.br",
"wal.gonzaga@dtidigital.com.br"
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

