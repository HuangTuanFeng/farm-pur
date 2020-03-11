const env = process.env.NODE_ENV
const baseUrl = ({
  development: 'http://127.0.0.1:8084/',
  test: 'http://apipurchasing.zs-game.com/',
  production: ''
})[env]

export {
  baseUrl
}
