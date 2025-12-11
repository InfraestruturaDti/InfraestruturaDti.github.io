winget install Schniz.fnm
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm use --install-if-missing 20
npm install -g http-server
npm install -g browser-sync
Install-Module Microsoft.Graph -Scope CurrentUser
#Install-Module -Name AzureAD
Install-Module -Name ExchangeOnlineManagement
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Install-Module Microsoft.Graph -Scope CurrentUser -Repository PSGallery -Force
