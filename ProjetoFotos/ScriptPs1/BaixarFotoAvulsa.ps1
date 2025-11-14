Connect-MgGraph 
$user = "raoni.resende@dtisistemas.com.br"
$tribos = Import-Csv -Path ".\ListaTribos.csv"
$blacklist = Import-Csv -Path ".\BlackList.csv"
$photoDirectory = ".\FotosColabs"

    # Verifique se o usuário está na blacklist
    if ($blacklist.UserPrincipalName -contains $user) {
        Write-Host "Skipping user $($user) as they are in the blacklist."
        continue
    }
    $i++
    write-host "$i out of $($users.count): $($user)"
    

        # Obtenha o ID do usuário pelo endereço de e-mail
        $userId = (Get-MgUser -Filter "mail eq '$($user)'").Id

        # Nome do arquivo com base na tribo e no e-mail
        $tribo = $tribos | Where-Object { $_.'E-mail' -eq $user } | Select-Object -ExpandProperty Tribo
        # Se a tribo não for encontrada, defina como "Novato"
        if (-not $tribo) {
            $tribo = "Novato"
        }
        $triboFormatted = $tribo.Split("-")[0].Trim().Replace(" ", "-")
        $nameFormatted = $user.Replace("@dtidigital.com.br", "").Replace(".", "-")
        $NameFile = "$triboFormatted-$nameFormatted"
        # Obtenha os dados da foto
        Get-MgUserPhotoContent -UserId $userId -OutFile ("{0}\{1}.jpg" -f $photoDirectory, $NameFile) -ErrorAction Stop
        
    