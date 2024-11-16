'use strict'
const url = require('url')
const { send } = require('micro')
const origin = process.env.ALLOW_ORIGIN
const insecure_origins = (process.env.INSECURE_HTTP_ORIGINS || '').split(',')
const middleware = require('./middleware.js')({ origin, insecure_origins })

async function service (req, res) {
  middleware(req, res, () => {
    let u = url.parse(req.url, true)

    if (u.pathname === '/') {
      res.setHeader('content-type', 'text/html')
      let html = `<!DOCTYPE html>
      <html lang="en">
        <title>isomorphic-git-cors-proxy</title>
        <h1>isomorphic-git-cors-proxy</h1>
        <p>This is the software running on <a href="https://isomorphic-git-cors-proxy.huaji.store">https://isomorphic-git-cors-proxy.huaji.store</a> <b>(Please notice that there is no slash at the end of the URL)</b> - A free service for users of <a href="https://isomorphic-git.org">isomorphic-git</a> to proxy git clone and push requests in the browser.</p>
        <p>The source code is hosted on GitHub at <a href="https://github.com/dongshunyao/isomorphic-git-cors-proxy">https://github.com/dongshunyao/isomorphic-git-cors-proxy</a></p>

        <h2>Terms of Use</h2>
        <p><b>This free service is provided to you AS IS with no guarantees. By using this free service, you promise not to use excessive amounts of bandwidth.</b></p>
        <p><b>If you are cloning or pushing large amounts of data, your IP address may be banned. Please run your own instance of the software if you need to make heavy use this service.</b></p>

        <h2>Allowed Origins</h2>
        This proxy allows git clone / fetch / push / getRemoteInfo requests from these domains: <code>${process.env.ALLOW_ORIGIN || '*'}</code>
      </html>
      `
      return send(res, 400, html)
    }

    // Don't waste my precious bandwidth
    return send(res, 403, '')
  })
}

module.exports = service
