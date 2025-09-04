#!/bin/bash

# 1. Kiểm tra thư mục
echo "Working in: $(pwd)"

# 2. Add tất cả file thay đổi
git add .

# 3. Commit code mới
echo "Enter commit message:"
read msg
git commit -m "$msg"

# 4. Push lên GitHub
git push origin main

# 5. Trigger Manual Deploy Render (optional)
echo "Bạn cần vào dashboard Render để Deploy latest commit nếu auto-deploy tắt."
