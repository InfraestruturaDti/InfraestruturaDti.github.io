##Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0


# Defina o diretório onde as fotos serão salvas
$photoDirectory = ".\Fotos"
# Importe os dados do arquivo CSV
$users = Import-Csv -Path ".\Users.csv"
Get-ChildItem -Path $photoDirectory -File | Remove-Item




$i = 0
foreach ($user in $users) {
    $i++
    write-host "$i out of $($users.count): $($user.UserPrincipalName)"
    
    try {
        # Obtenha o ID do usuário pelo endereço de e-mail
        $userId = (Get-MgUser -Filter "mail eq '$($user.UserPrincipalName)'").Id

        #Nome do arquivo
        $NameFile = $user.UserPrincipalName.Replace("@dtidigital.com.br", "").Replace(".","-")
        
        # Obtenha os dados da foto
        Get-MgUserPhotoContent -UserId $userId -OutFile ("{0}\{1}.jpg" -f $photoDirectory, $NameFile) -ErrorAction Stop
        
    } catch {
        Write-Host "Unable to get photo for user $($user.UserPrincipalName)"
    }
}