@echo off
cd /d "%~dp0"
echo.
echo  Publicando alteracoes no site...
echo.
git add .
git commit -m "atualizacao do site"
git push origin main
echo.
echo  Pronto! O site atualiza em cerca de 1 minuto.
echo  https://takeoffweb.github.io/quadracerta
echo.
pause
