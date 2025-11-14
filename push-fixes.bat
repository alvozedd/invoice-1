@echo off
echo Committing and pushing fixes for Vercel build and Gmail/AdSense...
echo.

git commit -m "Fix Vercel build issue and improve Gmail/AdSense error handling" -m "" -m "- Add vercel.json for proper Vite build configuration" -m "- Improve Gmail API initialization with better error messages" -m "- Add QUICK_FIX_GUIDE.md with setup instructions for AdSense and Gmail" -m "- Fix redirect URI guidance for OAuth configuration" -m "" -m "Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Commit failed!
    pause
    exit /b 1
)

echo.
echo Commit successful! Now pushing to GitHub...
echo.

git push origin master

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed!
    pause
    exit /b 1
)

echo.
echo ============================================
echo SUCCESS! Changes pushed to GitHub.
echo ============================================
echo.
echo Vercel will automatically rebuild your site.
echo Check deployment status at: https://vercel.com/dashboard
echo.
echo Your site: https://invoice-1-sand.vercel.app
echo.
echo IMPORTANT NEXT STEPS:
echo 1. Add environment variables to Vercel dashboard
echo 2. Get real AdSense slot IDs from your dashboard
echo 3. Configure OAuth redirect URIs in Google Cloud Console
echo.
echo See QUICK_FIX_GUIDE.md for detailed instructions.
echo.
pause
