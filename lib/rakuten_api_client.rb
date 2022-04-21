class RakutenApiClient

  RAKUTEN_HOST = "https://app.rakuten.co.jp/services"
  ITEMS_GET_URI = "#{RAKUTEN_HOST}/api/IchibaItem/Ranking/20170628?"
  RECIPES_GET_URI = "#{RAKUTEN_HOST}/api/Recipe/CategoryRanking/20170426?"

  def initialize
    @token = Rails.application.credentials.rakuten[:token]
    @genre_id = Rails.application.credentials.rakuten[:genre_id]
  end

  def get_items
    params = URI.encode_www_form({
      format: "json",
      genreId: @genre_id,
      applicationId: @token,
    })
    uri = URI.parse("#{ITEMS_GET_URI}#{params}")
    response = http_client(uri)
    JSON.parse(response.body)
  end

  def get_recipes
    params = URI.encode_www_form({
      format: "json",
      applicationId: @token,
      categoryId: "30",
    })
    uri = URI.parse("#{RECIPES_GET_URI}#{params}")
    response = http_client(uri)
    JSON.parse(response.body)
  end

  def get_sweets
    params = URI.encode_www_form({
      format: "json",
      genreId: "551167",
      applicationId: @token,
    })
    uri = URI.parse("#{ITEMS_GET_URI}#{params}")
    response = http_client(uri)
    JSON.parse(response.body)
  end

  class << self
    def client
      RakutenApiClient.new
    end

    def get_items
      client.get_items
    end

    def get_recipes
      client.get_recipes
    end

    def get_sweets
      client.get_sweets
    end
  end

  private

  def http_client(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
  end

end
