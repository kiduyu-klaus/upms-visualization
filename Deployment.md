# Deployment Guide

This guide covers various deployment options for the UPMs Visualization application.

## 🌐 Static Hosting Platforms

### Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Option A: Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Option B: Connect your Git repository for automatic deployments

3. **Configuration** (optional `netlify.toml`):
   ```toml
   [build]
   publish = "build"
   command = "npm run build"
   
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

### Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configuration** (`vercel.json`):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "build",
     "framework": "create-react-app"
   }
   ```

### GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/upms-visualization",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🐳 Docker Deployment

### Basic Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration (nginx.conf)

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Enable gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
}
```

### Build and Run Docker Container

```bash
# Build the image
docker build -t upms-visualization .

# Run the container
docker run -p 8080:80 upms-visualization
```

## ☁️ Cloud Platform Deployment

### AWS S3 + CloudFront

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to S3:**
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. **Configure S3 bucket for static website hosting**

4. **Set up CloudFront distribution** for global CDN

### Google Cloud Storage

1. **Build and upload:**
   ```bash
   npm run build
   gsutil -m rsync -r -d build/ gs://your-bucket-name
   ```

2. **Configure bucket for public access**

### Azure Static Web Apps

1. **Create Static Web App resource**

2. **Connect to GitHub repository**

3. **Configuration** (`.github/workflows/azure-static-web-apps.yml`):
   ```yaml
   name: Azure Static Web Apps CI/CD
   
   on:
     push:
       branches: [ main ]
     pull_request:
       types: [opened, synchronize, reopened, closed]
       branches: [ main ]
   
   jobs:
     build_and_deploy_job:
       runs-on: ubuntu-latest
       name: Build and Deploy Job
       steps:
       - uses: actions/checkout@v2
         with:
           submodules: true
       - name: Build And Deploy
         id: builddeploy
         uses: Azure/static-web-apps-deploy@v1
         with:
           azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
           repo_token: ${{ secrets.GITHUB_TOKEN }}
           action: "upload"
           app_location: "/"
           api_location: ""
           output_location: "build"
   ```

## 🚀 Performance Optimization for Production

### Build Optimization

1. **Analyze bundle size:**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   npm run build
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

2. **Environment variables** (`.env.production`):
   ```env
   GENERATE_SOURCEMAP=false
   INLINE_RUNTIME_CHUNK=false
   ```

### Caching Headers

Configure your hosting platform to set appropriate cache headers:

```
# Static assets (JS, CSS, images)
Cache-Control: public, max-age=31536000, immutable

# HTML files
Cache-Control: public, max-age=0, must-revalidate
```

### Compression

Enable gzip/brotli compression on your server:

```nginx
# Nginx example
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Brotli (if available)
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## 🔒 Security Considerations

### Content Security Policy

Add to your HTML or server configuration:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
">
```

### HTTPS

Always serve the application over HTTPS in production:

```nginx
# Nginx redirect to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Your existing configuration...
}
```

## 📊 Monitoring and Analytics

### Basic Analytics Integration

Add to `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring

Consider integrating services like:
- Sentry for error tracking
- LogRocket for session recording
- Hotjar for user behavior analytics

## 🔄 Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
      
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './build'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🧪 Testing Before Deployment

1. **Build and test locally:**
   ```bash
   npm run build
   npx serve -s build
   ```

2. **Check for broken links and accessibility:**
   - Use tools like Lighthouse
   - Test on different devices and browsers
   - Verify all interactive elements work correctly

3. **Performance testing:**
   - Run Lighthouse audits
   - Test on slow network conditions
   - Verify animations are smooth

## 📱 Mobile Optimization

Ensure the application works well on mobile devices:

1. **Test responsive design**
2. **Verify touch interactions**
3. **Check loading performance on mobile networks**
4. **Test on various screen sizes**

---

Choose the deployment method that best fits your needs and infrastructure. For a simple educational tool, Netlify or Vercel provide excellent free hosting with automatic HTTPS and global CDN.