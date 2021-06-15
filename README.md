1. git clone
2. bundle install
3. rake db:migrate
4. rails s

* 만약 루비 버전때문에 안되면
```bash
rbenv install 3.0.1      #루비 3.0.1 설치
rbenv rehash             #설치한 ruby 재실행
```

* jquery 설정
```javascript
//config/webpack/environment.js

const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}))

module.exports = environment
```

* api key 설정
/config/local_env.template.yml 값 채워서 /config/local_env.yml 으로 저장


