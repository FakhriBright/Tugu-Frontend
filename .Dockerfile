# ---- Base image: Node LTS ----
FROM node:20-alpine

WORKDIR /app

# Copy package.json dulu biar cache layer npm install optimal
COPY package*.json ./
RUN npm install

# Baru copy semua source code
COPY . .

EXPOSE 5173

# Jalanin vite dev server, --host wajib biar bisa diakses dari luar container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
