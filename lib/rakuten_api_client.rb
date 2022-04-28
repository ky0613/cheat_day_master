class RakutenApiClient

  RAKUTEN_HOST = "https://app.rakuten.co.jp/services"
  ITEMS_GET_URI = "#{RAKUTEN_HOST}/api/IchibaItem/Ranking/20170628?"
  RECIPES_GET_URI = "#{RAKUTEN_HOST}/api/Recipe/CategoryRanking/20170426?"

  def initialize
    @token = Rails.application.credentials.rakuten[:token]
  end

  def get_items(genre)
    params = URI.encode_www_form({
      format: "json",
      genreId: genre,
      applicationId: @token,
    })
    uri = URI.parse("#{ITEMS_GET_URI}#{params}")
    response = http_client(uri)
    JSON.parse(response.body)
  end

  def get_recipes(category)
    params = URI.encode_www_form({
      format: "json",
      categoryId: category,
      applicationId: @token,
    })
    uri = URI.parse("#{RECIPES_GET_URI}#{params}")
    response = http_client(uri)
    JSON.parse(response.body)
  end

  def get_sweets(genre)
    params = URI.encode_www_form({
      format: "json",
      genreId: genre,
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

    def get_items(genre)
      client.get_items(genre)
    end

    def get_recipes(category)
      client.get_recipes(category)
    end

    def get_sweets(genre)
      client.get_sweets(genre)
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
