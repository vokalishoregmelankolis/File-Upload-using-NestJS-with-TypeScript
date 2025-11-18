# ✅ Setup Complete!

## Running Services

### Backend Services
- **Backend S3** (Port 3000): http://localhost:3000 ✅
- **Backend Multer** (Port 3002): http://localhost:3002 ✅

### Frontend Services  
- **Frontend S3** (Port 3001): http://localhost:3001 ✅
- **Frontend Multer** (Port 3003): http://localhost:3003 ✅

### MinIO S3 Storage
- **API**: http://localhost:9000 ✅
- **Console**: http://localhost:9001 ✅
  - Username: `minioadmin`
  - Password: `minioadmin`

## Testing Instructions

### Test Multer Implementation (Port 3003)
1. Open http://localhost:3003
2. Register/Login dengan username dan password
3. Click "Create New Post"
4. Tulis content dan upload gambar
5. Gambar akan tersimpan di folder `backend-multer/uploads/`
6. Gambar dapat diakses via http://localhost:3002/uploads/[filename]

### Test S3 Implementation (Port 3001)
1. Open http://localhost:3001
2. Register/Login dengan username dan password
3. Click "Create New Post"
4. Tulis content dan upload gambar
5. Gambar akan di-upload ke MinIO S3 bucket
6. Gambar dapat diakses via http://localhost:9000/test-bucket/[imagePath]

## Verify MinIO
- Open http://localhost:9001
- Login dengan minioadmin/minioadmin
- Check bucket "test-bucket" untuk melihat uploaded files

## Stop Services
```bash
# Stop all background processes
# Process IDs:
# - Backend S3: Process 4
# - Backend Multer: Process 5
# - Frontend S3: Process 6
# - Frontend Multer: Process 9
# - MinIO: Process 10
```
