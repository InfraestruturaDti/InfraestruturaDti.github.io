Passo a passo para executar os scripts
1-
mover o arquivo "Remove_User_All_GroupsV2.ps1" para o C:/

2-
abrir o scriptPS1 e alterar os emails na parte superior do arquivo

3-
Executar os install-module no cabeçalho do arquivo caso não tenha os modulos instalados

4-
Abrir o Power shell em modo administrador

5- 
Copiar o script a partir do #Inicializando conexões ate o fim no power shell

6-
Executar o script

Notes:
Será gerado um LogScript.txt no C:/ contendo os logs e execuções do fluxo. Os erros de remoção de grupo em geral será registrado neste log.

Os usuarios sem grupo atribuidos serão ignorados

Requer uma licença O365 Business basic, cuja licença SKU é 3b555118-da6a-4418-894f-7df1e2096870
Caso não tenha a licença, basta trocar o idSKU da licença para uma outra que permita a ação de remover do grupo.