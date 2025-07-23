# Usar a imagem oficial do PHP com FPM
FROM php:8.1-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y     build-essential     libpng-dev     libjpeg62-turbo-dev     libfreetype6-dev     locales     zip     jpegoptim optipng pngquant gifsicle     vim     unzip     git     curl     libzip-dev     libonig-dev     libpq-dev # Dependência para PostgreSQL

# Limpar o cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensões do PHP
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl
RUN docker-php-ext-install gd

# Instalar o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Copiar os arquivos da aplicação
COPY . .

# Mudar o dono dos arquivos para o usuário do www-data
RUN chown -R www-data:www-data /var/www/html

# Expor a porta 9000 e iniciar o servidor PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]

