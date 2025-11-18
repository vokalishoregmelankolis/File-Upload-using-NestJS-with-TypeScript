# Testing Guide - File Upload Implementations

## Running Servers

### Backend Multer (Port 3002)
```bash
cd backend-multer
pnpm install
npx prisma generate
npx prisma migrate dev
pnpm start:dev
```

### Backend S3 (Port 3000)
```bash
cd backend
pnpm install
npx prisma generate
npx prisma migrate dev
pnpm start:dev
```

### Frontend Multer (Port 3003)
```bash
cd frontend-multer
pnpm install
pnpm dev
```

### Frontend S3 (Port 3001)
```bash
cd frontend
pnpm install
pnpm dev
```

## Testing Multer Implementation (localhost:3003)

✅ **WORKING** - Upload files directly to backend server

1. Open http://localhost:3003
2. Register/Login
3. Create new post with image
4. Image will be uploaded to `backend-multer/uploads/` folder
5. Images are served via http://localhost:3002/uploads/

## Testing S3 Implementation (localhost:3001)

⚠️ **Requires MinIO Setup**

### Option 1: Using Docker (Recommended)
```bash
docker run -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  quay.io/minio/minio server /data --console-address ":9001"
```

Then create bucket:
1. Open http://localhost:9001
2. Login with minioadmin/minioadmin
3. Create bucket named "test-bucket"
4. Set bucket policy to public

### Option 2: Skip S3 Testing
The S3 implementation is tested via e2e tests which mock the S3 service.
