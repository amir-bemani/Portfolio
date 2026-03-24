@echo off
cd /d D:\pr\Portfolio
git add .
git commit -m "Fix initial load flicker/FOUC by adding static opacity-0 classes"
git push origin main
