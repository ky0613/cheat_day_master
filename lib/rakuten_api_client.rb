class RakutenApiClient

    RAKUTEN_HOST = "https://app.rakuten.co.jp/services"
    GET_URI = "#{RAKUTEN_HOST}/api/IchibaItem/Ranking/20170628?"

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
      uri = URI.parse("#{GET_URI}#{params}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(uri.request_uri)
      response = http.request(request)
      JSON.parse(response.body)
    end

    class << self
      def client
        RakutenApiClient.new
      end

      def get_items
        client.get_items
      end
    end
end
