source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.1'

gem 'bootsnap', '>= 1.4.4', require: false
gem "activerecord-import"
gem 'rails', '~> 6.1.5'
gem 'pg'
gem 'config'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'jbuilder', '~> 2.7'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# ログイン
gem 'sorcery'
gem 'jwt'
gem 'rack-cors'

# メール
gem 'net-smtp'
gem 'net-imap'
gem 'net-pop'

group :development, :test do
  # デバッグでのエラーファイル表示のために導入
  gem 'pry-rails'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rubocop', require: false
  gem 'sqlite3', '~> 1.4'
  gem 'letter_opener_web'
  # RSpec
  gem 'factory_bot_rails'
  gem 'rspec-rails'
end

group :development do
  gem 'foreman'
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  gem 'spring'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'webdrivers'
end
