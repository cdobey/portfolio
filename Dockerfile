FROM nginx:alpine

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/

# Copy CSS and JS
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Copy assets (images)
COPY assets/ /usr/share/nginx/html/assets/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
