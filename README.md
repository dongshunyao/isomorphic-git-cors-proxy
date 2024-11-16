# isomorphic-git-cors-proxy

This is the software running on https://isomorphic-git-cors-proxy.huaji.store - A free service for users of [isomorphic-git](https://isomorphic-git.org) to proxy git clone and push requests in the browser.

It is derived from https://github.com/wmhilton/cors-buster with added restrictions to reduce the opportunity to abuse the proxy. Namely, it blocks requests that don't look like valid git requests.

## Start

Start proxy on default port `9999`:

```bash
npm start
```

## CLI configuration

Environment variables:

- `PORT` the listening port
- `ALLOW_ORIGIN` the value for the 'Access-Control-Allow-Origin' CORS header
- `INSECURE_HTTP_ORIGINS` the comma separated list of origins for which HTTP should be used instead of HTTPS

## License

This work is released under [The MIT License](https://opensource.org/licenses/MIT)
