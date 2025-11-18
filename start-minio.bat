@echo off
echo Starting MinIO Server...
echo.
echo Downloading MinIO if not exists...

if not exist "minio.exe" (
    echo Downloading minio.exe...
    curl -O https://dl.min.io/server/minio/release/windows-amd64/minio.exe
)

echo.
echo Starting MinIO on port 9000 (API) and 9001 (Console)...
echo Console URL: http://localhost:9001
echo Username: minioadmin
echo Password: minioadmin
echo.

set MINIO_ROOT_USER=minioadmin
set MINIO_ROOT_PASSWORD=minioadmin

minio.exe server ./minio-data --console-address ":9001"
