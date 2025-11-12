@echo off
echo Committing Gmail service fixes...
git add src/services/gmailService.js
git commit -m "Fix Gmail OAuth null reference errors with proper auth instance checking"
git push origin master
echo Done!
pause
