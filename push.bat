@echo off
cd /d D:\pr\Portfolio
git add .
git commit -m "Fix mobile initial load flicker by conditioning 3D transforms"
git push origin main
