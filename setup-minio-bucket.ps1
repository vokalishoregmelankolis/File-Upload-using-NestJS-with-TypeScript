# Setup MinIO Bucket
Write-Host "Setting up MinIO bucket..." -ForegroundColor Green

# Download mc (MinIO Client) if not exists
if (!(Test-Path "mc.exe")) {
    Write-Host "Downloading MinIO Client (mc.exe)..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://dl.min.io/client/mc/release/windows-amd64/mc.exe" -OutFile "mc.exe"
}

# Configure mc alias
Write-Host "Configuring MinIO client..." -ForegroundColor Yellow
.\mc.exe alias set myminio http://localhost:9000 minioadmin minioadmin

# Create bucket
Write-Host "Creating bucket 'test-bucket'..." -ForegroundColor Yellow
.\mc.exe mb myminio/test-bucket --ignore-existing

# Set bucket policy to public (download)
Write-Host "Setting bucket policy to public..." -ForegroundColor Yellow
.\mc.exe anonymous set download myminio/test-bucket

Write-Host "`nMinIO setup complete!" -ForegroundColor Green
Write-Host "Bucket: test-bucket" -ForegroundColor Cyan
Write-Host "Console: http://localhost:9001" -ForegroundColor Cyan
Write-Host "API: http://localhost:9000" -ForegroundColor Cyan
