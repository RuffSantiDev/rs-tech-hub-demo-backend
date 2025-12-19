FROM node:24-alpine3.21

ENV TZ="UTC"
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
RUN apk add --no-cache \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libxkbcommon0 \
    libpango1.0-0 \
    libasound2 \
    libxshmfence1 \
    libgbm-dev \
    libgtk-3-0 \
    libx11-xcb1 \
    libx11-6 \
    libx11-xcb-dev \
    libxcb1 \
    libxcomposite-dev \
    libxdamage-dev \
    libxext-dev \
    libxfixes-dev \
    libxrandr-dev \
    libxrender-dev \
    libxrender-dev \
    libxtst-dev \
    ca-certificates \
    ttf-freefont \
    xdg-utils \
    wget
# Install Doppler CLI for Alpine
RUN wget -q -O - https://cli.doppler.com/install.sh | sh

RUN npx prisma generate
RUN npm i -g typescript
RUN yarn build

COPY /src/public /app/dist/src/public
RUN [ -e /app/db-pw.dev.secret.txt ] && rm /app/db-pw.dev.secret.txt || echo "File not found, skipping removal"
RUN [ -e /app/db-pw.staging.secret.txt ] && rm /app/db-pw.staging.secret.txt || echo "File not found, skipping removal"
RUN [ -e /app/db-pw.prod.secret.txt ] && rm /app/db-pw.prod.secret.txt || echo "File not found, skipping removal"

ENV ADMIN_JS_SKIP_BUNDLE="true"
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 3000
CMD ["yarn", "start"]