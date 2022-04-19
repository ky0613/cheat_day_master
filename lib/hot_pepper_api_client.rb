class HotPepperApiClient
  HOTPEPPER_HOST = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?"

  def initialize
    @token = Rails.application.credentials.dig(:hotpepper, :token)
  end

  def get_stores(lat, lng)
    params = URI.encode_www_form({
      key: @token,
      lat: lat,
      lng: lng,
      range: "5",
      order: "4",
      format: "json",
    })
    uri = URI.parse("#{HOTPEPPER_HOST}#{params}")
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
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
