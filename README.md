# README

- [Add vue folder to asset pipeline for compilation](https://github.com/arkhamRejek/minipack_example/blob/master/config/initializers/assets.rb#L15-L19)

- [Copy this whole config](https://github.com/arkhamRejek/minipack_example/blob/master/config/initializers/minipack.rb)

- [Create this vue config](https://github.com/arkhamRejek/minipack_example/blob/master/client/vue.config.js)

- [Not needed but if you don't want to manually start your server](https://github.com/arkhamRejek/minipack_example/blob/master/lib/tasks/start.rake)

run this command to start up your app
```
  rails start
```


## Note

Keep in mind you need to run

```
  yarn build
```
and then

```
rails assets:precompile
```

because the manifest file is generated in the public directory, it's required by minipack in order to find your js assets