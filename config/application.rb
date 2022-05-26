require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CheatDayMaster
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    config.api_only = true

    config.paths.add 'lib', eager_load: true
    config.middleware.use ActionDispatch::Flash

    config.generators do |g|
      g.template_engine false
      g.assets false
      g.helper false
      g.skip_routes true
      g.test_framework :rspec,
                        view_specs: false,
                        helper_specs: false,
                        controller_specs: false,
                        routing_specs: false
    end

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::ContentSecurityPolicy::Middleware
  end
end
