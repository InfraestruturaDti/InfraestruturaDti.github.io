Install-Module -Name AzureAD
Install-Module -Name ExchangeOnlineManagement
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Install-Module Microsoft.Graph -Scope CurrentUser -Repository PSGallery -Force


npm install -g http-server
npm install -g browser-sync
