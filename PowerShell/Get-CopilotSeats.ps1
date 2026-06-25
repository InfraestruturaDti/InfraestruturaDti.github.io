# Substitua os valores abaixo antes de executar o script
param(
    [Parameter(Mandatory = $true)]
    [string]$Org,

    [Parameter(Mandatory = $true)]
    [string]$Token,

    [string]$OutputFile = "copilot_seats.json"
)

$headers = @{
    "Authorization" = ("Bearer " + $Token)
    "Accept"        = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

$allSeats = @()
$page = 1
$perPage = 100

do {
    $url = "https://api.github.com/orgs/$Org/copilot/billing/seats?per_page=$perPage&page=$page"
    Write-Host "Buscando pagina $page: $url"

    $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Get

    if ($response.seats.Count -eq 0) {
        break
    }

    $allSeats += $response.seats
    $page++

} while ($response.seats.Count -eq $perPage)

$result = @{
    total_seats = $allSeats.Count
    seats       = $allSeats
}

$result | ConvertTo-Json -Depth 10 | Out-File -FilePath $OutputFile -Encoding utf8

Write-Host "Total de assentos encontrados: $($allSeats.Count)"
Write-Host "Resultado salvo em: $OutputFile"
