$photoDirectory = ".\Fotos"
# Importe os dados do arquivo CSV
$users = Import-Csv -Path ".\Users.csv"
$tribos = Import-Csv -Path ".\ListaTribos.csv"
$blacklist = Import-Csv -Path ".\BlackList.csv"
$ListaFotos = Get-ChildItem -Path $photoDirectory -File
foreach ($user in $users) {
        # Nome do arquivo
        $nameFormatted = $user.UserPrincipalName.Replace("@dtidigital.com.br", "").Replace(".", "-")
        # Nome do arquivo com base na tribo e no e-mail
        $tribo = $tribos | Where-Object { $_.'E-mail' -eq $user.UserPrincipalName } | Select-Object -ExpandProperty Tribo
        # Se a tribo não for encontrada, defina como "Novato"
        if (-not $tribo) {
            $tribo = "Novato"
        }
        $triboFormatted = $tribo.Split("-")[0].Trim().Replace(" ", "-")
        $NameFile = "$triboFormatted-$nameFormatted"
        # Verifique se a foto já existe na lista de fotos
        $existingPhoto = $ListaFotos | Where-Object { $_.Name -eq $NameFile + ".jpg" }

        if ($existingPhoto) {
            # Remova a foto existente da lista
            $ListaFotos = $ListaFotos | Where-Object { $_.Name -ne $NameFile + ".jpg"}
            Write-Host "$NameFile - Skipping user $($user.UserPrincipalName) as they are already donwloaded."
        }
}

    write-host $ListaFotosphoto
