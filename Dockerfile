# ---- Base image: Node 20 LTS Alpine ----
FROM node:20-alpine

WORKDIR /app

# Copy package.json dulu biar cache layer npm install optimal
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Setup entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN tr -d '\r' < /usr/local/bin/entrypoint.sh > /usr/local/bin/entrypoint_unix.sh \
    && mv /usr/local/bin/entrypoint_unix.sh /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 5173

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
