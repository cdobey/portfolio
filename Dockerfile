FROM nginx:alpine

# Copy website files to nginx html directory
COPY public/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
