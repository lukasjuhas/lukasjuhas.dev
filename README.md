# itsluk.as
My little pice of internet build on my [web-starter](https://github.com/lukasjuhas/web-starter).

### My intentions of this project
* Create personal website that would use my [api](https://github.com/lukasjuhas/api.itsluk.as) among others.
* Write clean and neat code using best practices I learned so far.
* Learn more about working with [Vue](https://vuejs.org).
* Build it with my [web-starter](https://github.com/lukasjuhas/web-starter) in order to test it properly and tweak any potential problems.
* Learn to write clean and readable tests in [Vue](https://vuejs.org).
* Give Open Source community an example of a site build on [web-starter](https://github.com/lukasjuhas/web-starter). (gulp, rollup & vue)
* Have my personal web creative space where I could experiment and keep improving it.
* Build space to show my interests.
* Bring something unique to the table.

## Server Configuration
As I'm using vue-router with HTML5 history mode, site requires some server Configuration
to avoid 404s.

#### Apache

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Node.js (Express)

For Node.js/Express, consider using [connect-history-api-fallback middleware](https://github.com/bripkens/connect-history-api-fallback).


## Tasks
#### Default / Development
```js
gulp
```

#### Watch (Dev)
Runs Default / Development task along with watch & browserSync.

```js
gulp watch
```

#### Build
By default build task will bump **patch** version in package.json
```js
gulp build
```

In order to bump **major** or **minor** version use following flags:
```js
gulp build --major
```
or
```js
gulp build --minor
```
