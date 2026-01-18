FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/
COPY profile-pic.jpg /usr/share/nginx/html/
COPY screenshot-landmark-museum.png /usr/share/nginx/html/
COPY screenshot-legitify.png /usr/share/nginx/html/
COPY screenshot-nassets.png /usr/share/nginx/html/
COPY screenshot-todo.png /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
