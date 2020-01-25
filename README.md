## How to run:
Setup:

Assumes you have yarn installed (`brew install yarn`)

`bundle install`

`rake db:migrate db:seed`

`yarn install`

Change config values in `config/development.rb` and `config/production.rb`:

```ruby
  config.signup_notification_email = "[CHANGE_ME]"
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
      address: 'smtp.gmail.com',
      port: 587,
      user_name: '[CHANGE_ME]',
      password: '[CHANGE_ME]',
      openssl_verify_mode: 'none',
      tls: true
  }
  config.admin_api_token = "ADMIN_API_KEY"
```

Run tests: `rake test`

Run the app: `rails s`


`open http://localhost:3000` - consumer user app

`open http://localhost:3000/admin` - admin app (login/pass: admin/secret)