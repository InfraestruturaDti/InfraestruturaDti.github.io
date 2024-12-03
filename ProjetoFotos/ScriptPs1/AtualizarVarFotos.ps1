# Caminho para o arquivo CSV e o arquivo JS
$ImgPath = ".\FotosColabs"
$jsPath = ".\Imagens.js"


$arquivos = Get-ChildItem -Path $ImgPath

# Extraia os nomes e crie uma lista de caminhos de imagem
$imagePaths = @()
foreach ($arquivo in $arquivos) {
    $imagePath = $arquivo.Name
    $imagePaths += """FotosColabs\\$imagePath"""
}

# Converta a lista de caminhos de imagem em uma string formatada
$imageListString = $imagePaths -join ",`n`t"

# Crie o novo conteúdo da lista de imagens
$newImageListContent = "export const IMAGENS = [`n`t$imageListString`n];"

# Leia o conteúdo do arquivo JS
$jsContent = Get-Content -Path $jsPath -Raw

# Substitua toda a lista de imagens
$updatedJsContent = $jsContent -replace "(?s)(export const IMAGENS = \[.*?\];)", $newImageListContent

# Salve as alterações de volta no arquivo JS
Set-Content -Path $jsPath -Value $updatedJsContent

Write-Host "Arquivo JS atualizado com sucesso!"