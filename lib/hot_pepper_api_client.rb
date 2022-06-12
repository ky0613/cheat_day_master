require 'faraday'
require 'faraday/net_http'
Faraday.default_adapter = :net_http

class HotPepperApiClient
  BASE_URL = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"

  def initialize
    @token = Rails.application.credentials.dig(:hotpepper, :token)
  end

  def get_stores(lat, lng)
    response = Faraday.get(BASE_URL) do |req|
      req.params['key'] = @token
      req.params['lat'] = lat
      req.params['lng'] = lng
      req.params['range'] = Settings.hotpepper.range
      req.params['order'] = Settings.hotpepper.order
      req.params['format'] = Settings.hotpepper.format
    end

    JSON.parse(response.body)
  end

  class << self
    def client
      HotPepperApiClient.new
    end

    def get_stores(lat, lng)
      client.get_stores(lat, lng)
    end
  end
end
