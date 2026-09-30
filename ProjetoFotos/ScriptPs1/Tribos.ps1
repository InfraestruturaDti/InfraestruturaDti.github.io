# Funções compartilhadas para descobrir a tribo de cada colaborador.
# Uso (a partir da pasta ProjetoFotos):  . .\ScriptPs1\Tribos.ps1

# Lê o ListaTribos.csv e devolve um dicionário e-mail -> tribo.
# As chaves do hashtable do PowerShell não diferenciam maiúsculas/minúsculas.
function Get-MapaTribos {
    param([string]$Caminho = ".\ListaTribos.csv")

    $mapa = @{}
    foreach ($linha in Import-Csv -Path $Caminho) {
        $email = "$($linha.'E-mail')".Trim()
        if ($email -and -not $mapa.ContainsKey($email)) {
            $mapa[$email] = $linha.Tribo
        }
    }
    return $mapa
}

# Converte o valor da coluna Tribo no prefixo usado no nome da foto.
# Aceita o formato novo ("Javalis") e o antigo ("Hakuna - Javalis - Rafiki"),
# usando sempre o primeiro trecho. Espaços são removidos porque o script.js
# separa o nome do arquivo pelo "-" para achar a borda.
function Get-TriboFormatada {
    param([string]$Tribo)

    $nome = ("$Tribo" -split "-")[0].Trim() -replace "\s+", ""
    if (-not $nome) {
        return "Novato"
    }
    return $nome
}

# Devolve o prefixo da tribo de um e-mail, ou "Novato" se ele não estiver na lista.
function Get-TriboDoUsuario {
    param(
        [hashtable]$MapaTribos,
        [string]$Email
    )

    return Get-TriboFormatada $MapaTribos[$Email.Trim()]
}
