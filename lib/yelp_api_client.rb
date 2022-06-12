require 'faraday'
require 'faraday/net_http'
Faraday.default_adapter = :net_http

class YelpApiClient

  BASE_URL = "https://api.yelp.com/v3/businesses/search"

  def initialize
    @token = Rails.application.credentials.dig(:yelp, :token)
  end

  def get_stores(lat, lng)
    response = Faraday.get(BASE_URL, ssl: { ca_path: "/opt/homebrew/etc/openssl@3" }) do |req|
      req.params['radius'] = Settings.yelp.radius
      req.params['sort_by'] = Settings.yelp.sort
      req.params['price'] = Settings.yelp.price
      req.params['kimit'] = Settings.yelp.limit
      req.params['latitude'] = lat
      req.params['longitude'] = lng
      req.headers['Authorization'] =  "Bearer #{@token}"
    end

    JSON.parse(response.body)
  end

  class << self
    def client
      YelpApiClient.new
    end

    def get_stores(lat, lng)
      client.get_stores(lat, lng)
    end
  end
end
