Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\doloj\Claude\tsv-hessental-website\assets\images\TSV Hessental logo_transparent.png"
$faviconOut = "C:\Users\doloj\Claude\tsv-hessental-website\assets\images\favicon.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

# Favicon: fit the WHOLE crest (not just a crop) into a square canvas,
# centered, keeping its aspect ratio, with transparent padding left/right.
$favSize = 128
$scale = [Math]::Min($favSize / $w, $favSize / $h)
$drawW = [int]($w * $scale)
$drawH = [int]($h * $scale)
$offsetX = [int](($favSize - $drawW) / 2)
$offsetY = [int](($favSize - $drawH) / 2)

$favicon = New-Object System.Drawing.Bitmap $favSize, $favSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($favicon)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($src, $offsetX, $offsetY, $drawW, $drawH)
$g.Dispose()
$favicon.Save($faviconOut, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved favicon: $faviconOut ($favSize x $favSize), crest drawn at $drawW x $drawH"

$src.Dispose()
$favicon.Dispose()
