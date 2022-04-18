class RakutenApiClient

  class << self

    RAKUTEN_HOST = "https://app.rakuten.co.jp/services"
    GET_URI = "#{RAKUTEN_HOST}/api/IchibaItem/Ranking/20170628?"

    def get_items
      params = URI.encode_www_form({
        format: "json",
        genreId: Rails.application.credentials.rakuten[:genre_id],
        applicationId: Rails.application.credentials.rakuten[:token],
      })
      uri = URI.parse("#{GET_URI}#{params}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(
        uri.request_uri
      )
      response = http.request(request)
      JSON.parse(response.body)
    end

  end
end
