# no-pain-no-breaks
Body pain logging and more






# Attribution

Images

- CC BY
  - found on wikipedia, https://commons.wikimedia.org/wiki/File:1105_Anterior_and_Posterior_Views_of_Muscles.jpg
    CC BY OpenStax https://cnx.org/contents/FPtK1zmh@8.25:fEI3C8Ot@10/Preface
  - modified with: convert -crop 100%x50% +repage full.jpg full_%d.jpg

# Created with

~~~
Vue CLI v4.4.1

? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors,
 Linter
? Use history mode for router? (Requires proper server setup for index fallback 
in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported 
by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated confi
g files
? Save this as a preset for future projects? Yes
? Save preset as: JS-SCSS-ROUTER

🎉  Preset JS-SCSS-ROUTER saved in /home/.../.vuerc
~~~

------

https://github.com/MDSLKTR/pouch-vue/

~~~
npm i pouchdb-browser pouchdb-live-find pouchdb-find pouch-vue
~~~

~~~
# main.js

import PouchVue from 'pouch-vue'
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'
PouchDB.plugin(PouchFind)
PouchDB.plugin(PouchLiveFind)
Vue.use(PouchVue, {
  pouch: PouchDB,
  defaultDB: 'npnb',
})
~~~

------

Read about couchdb partitioned database:

- https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning
- very interesting
- but created a standard one as (on couchdb, for sync later)
  - we are low-data anyway
  - I'm not sur we can use it as a normal one
- still... will use "user:timestamp" (not even sure it's necessary) just in case, so it is possible to try and migrate





