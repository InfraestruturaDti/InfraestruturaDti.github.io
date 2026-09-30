# Baixa a foto de um único colaborador. Troque o e-mail abaixo e rode a partir da pasta ProjetoFotos.
# Depois rode .\ScriptPs1\AtualizarVarFotos.ps1 para a foto nova entrar no Imagens.js.
Connect-MgGraph
$user = "adminteltec@dtidigital.com.br"
. .\ScriptPs1\Tribos.ps1
$tribos = Get-MapaTribos -Caminho ".\ListaTribos.csv"
$blacklist = Import-Csv -Path ".\BlackList.csv"
$photoDirectory = ".\FotosColabs"

# Verifique se o usuário está na blacklist
if ($blacklist.UserPrincipalName -contains $user) {
    Write-Host "Skipping user $($user) as they are in the blacklist."
    return
}
write-host "Baixando foto de: $($user)"

# Obtenha o ID do usuário pelo endereço de e-mail
$userId = (Get-MgUser -Filter "mail eq '$($user)'").Id

# Nome do arquivo com base na tribo e no e-mail (sem tribo na lista = "Novato")
$triboFormatted = Get-TriboDoUsuario -MapaTribos $tribos -Email $user
$nameFormatted = $user.Replace("@dtidigital.com.br", "").Replace(".", "-")
$NameFile = "$triboFormatted-$nameFormatted"
# Obtenha os dados da foto
Get-MgUserPhotoContent -UserId $userId -OutFile ("{0}\{1}.jpg" -f $photoDirectory, $NameFile) -ErrorAction Stop
Write-Host "Foto salva: $photoDirectory\$NameFile.jpg"
