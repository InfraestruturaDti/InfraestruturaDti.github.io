##Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0


# Defina o diretório onde as fotos serão salvas
$photoDirectory = ".\FotosColabs"
# Importe os dados do arquivo CSV
$users = Import-Csv -Path ".\Users.csv"
. .\ScriptPs1\Tribos.ps1
$tribos = Get-MapaTribos -Caminho ".\ListaTribos.csv"
$blacklist = Import-Csv -Path ".\BlackList.csv"

#Resetando todas as fotos
$currentDay = (Get-Date).DayOfWeek
if ($currentDay -eq 'Saturday' -or $currentDay -eq 'Sunday' -or $currentDay -eq 'Monday') {
    Get-ChildItem -Path $photoDirectory -File | Remove-Item -Force
    
}
$ListaFotos = Get-ChildItem -Path $photoDirectory -File
# Get-ChildItem -Path $photoDirectory -File | Remove-Item

$i = 0
foreach ($user in $users) {
    # Verifique se o usuário está na blacklist
    if ($blacklist.UserPrincipalName -contains $user.UserPrincipalName) {
        Write-Host "Skipping user $($user.UserPrincipalName) as they are in the blacklist."
        continue
    }
    
    $i++
    write-host "$i out of $($users.count): $($user.UserPrincipalName)"
    
    try {
        # Nome do arquivo
        $nameFormatted = $user.UserPrincipalName.Replace("@dtidigital.com.br", "").Replace(".", "-")
        # Nome do arquivo com base na tribo e no e-mail (sem tribo na lista = "Novato")
        $triboFormatted = Get-TriboDoUsuario -MapaTribos $tribos -Email $user.UserPrincipalName
        $NameFile = "$triboFormatted-$nameFormatted"
        # Verifique se a foto já existe na lista de fotos
        $existingPhoto = $ListaFotos | Where-Object { $_.Name -eq $NameFile + ".jpg" }

        if ($existingPhoto) {
            # Remova a foto existente da lista
            $ListaFotos = $ListaFotos | Where-Object { $_.Name -ne $NameFile + ".jpg"}
            Write-Host $NameFile + ".jpg - Skipping user $($user.UserPrincipalName) as they are already donwloaded."
            continue
        }
        
            # Obtenha o ID do usuário pelo endereço de e-mail
            $userId = (Get-MgUser -Filter "mail eq '$($user.UserPrincipalName)'").Id


            # Obtenha os dados da foto
            Get-MgUserPhotoContent -UserId $userId -OutFile ("{0}\{1}.jpg" -f $photoDirectory, $NameFile) -ErrorAction Stop
        
        
    }
    catch {
        Write-Host "Unable to get photo for user $($user.UserPrincipalName)"
    }
}

# Remover todas as fotos excedentes
foreach ($photo in $ListaFotos) {
    try {
        # Remove o arquivo de foto
        Remove-Item -Path $photo.FullName -ErrorAction Stop
        Write-Host "Removed photo: $($photo.FullName)"
    }
    catch {
        Write-Host "Failed to remove photo: $($photo.Name). Error: $_"
        continue
    }
}
