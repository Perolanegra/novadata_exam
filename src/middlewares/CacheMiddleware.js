const sharp = require("sharp");

class CacheMiddleware {
  constructor() {
    this.cache = {};
    this.previousRoute = undefined;
    this.cacheVerify = this.cacheVerify.bind(this);
  }

  getFromCache(key) {
    return this.cache[key];
  }

  setInCache(key, data) {
    this.cache[key] = data;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  cacheVerify(req, res, next) {
    try {
      const key = req.originalUrl;
      const startTime = new Date();
      const cachedData = this.getFromCache(key);

      const isSameRoute = this.previousRoute ?? this.previousRoute === key;
      this.previousRoute = key;

      if (cachedData && !this.isCacheExpired(cachedData) && isSameRoute) {
        // Se os dados estiverem em cache e não expirarem, envie-os diretamente
        const endTime = new Date();

        this.logCacheHit(key, startTime, endTime);
        res.send(cachedData.data);
      } else {
        // Se os dados não estiverem em cache ou expirarem, configure o novo comportamento do res.send
        this.invalidateCache(key);

        res.sendResponse = res.send;
        res.send = async (body) => {
          req.file ? await this.minifyImage({ data: req.file }) : "";
          const dataToCache = {
            data: body,
            timestamp: new Date().getTime(),
          };
          this.setInCache(key, dataToCache);
          const endTime = new Date();
          this.logCacheMiss(key, startTime, endTime);
          res.sendResponse(body);
        };
        next();
      }
    } catch (error) {
      return res
        .status(500)
        .send({ msg: "Não foi possível armazenar o cache.", err: error });
    }
  }

  isCacheExpired(cachedData) {
    // Verifique se o tempo decorrido desde a última atualização ultrapassa o TTL desejado
    const currentTime = new Date().getTime(); // milissegundos
    const cacheTime = cachedData.timestamp;
    // obter o TTL do arquivo env do projeto.
    const ttl = process.env.CACHE_TTL * 1000;
    return currentTime - cacheTime > ttl;
  }

  logCacheHit(key, startTime, endTime) {
    // Função para registrar um acerto no cache
    const duration = endTime - startTime;
    console.log(`Cache hit for ${key}. Load time: ${duration}ms`);
  }

  logCacheMiss(key, startTime, endTime) {
    // Função para registrar que não está no cache
    const duration = endTime - startTime;
    console.log(`Cache miss for ${key}. Load time: ${duration}ms`);
  }

  invalidateCache(key) {
    // Função para invalidar uma entrada específica do cache. Deve ser chamada após alguma persistência de dados no banco, passsando a rota como key.
    delete this.cache[key];
  }

  async minifyImage(res) {
    // Check if the response data contains the image field
    return new Promise((resolve, reject) => {
      if (res.data.image) {
        const imageBuffer = Buffer.from(res.data.image, "base64");

        // Minify the image using sharp
        sharp(imageBuffer)
          .resize({ width: 300 }) // Adjust the width as needed
          .toBuffer()
          .then((minifiedImageBuffer) => {
            // Update the response data with the minified image
            res.data.image = minifiedImageBuffer.toString("base64");
            console.log("image minified: ", res.data.image);
            resolve(true);
          })
          .catch((err) => {
            console.error("Error minifying image:", err);
          });
      }
    });
  }
}

module.exports = CacheMiddleware;
