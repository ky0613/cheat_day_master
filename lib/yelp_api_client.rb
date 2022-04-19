class YelpApiClient

  YELP_HOST = "https://api.yelp.com/v3/businesses/search?"

  def initialize
    @token = Rails.application.credentials.dig(:yelp, :token)
  end

  def get_stores(lat, lng)
    params = URI.encode_www_form({
      latitude: "35.6581",
      longitude: "139.7017",
      radius: "3000",
      # lat: lat,
      # lng: lng,
    })
    uri = URI.parse("#{YELP_HOST}#{params}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(
      uri.request_uri,
      'Authorization' => "Bearer #{@token}"
    )
    response = http.request(request)
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
