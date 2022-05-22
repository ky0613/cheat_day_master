class TwitterApiClient

  ACCESS_TOKEN_HOST = "https://api.twitter.com/oauth/access_token?"

  def initialize(oauth_token, oauth_verifier)
    @oauth_token = oauth_token
    @oauth_verifier = oauth_verifier
  end

  def access_token
    params = URI.encode_www_form({
      oauth_token: @oauth_token,
      oauth_verifier: @oauth_verifier
    })
    uri = URI.parse("#{ACCESS_TOKEN_HOST}#{params}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.request_uri)
    response = http.request(request)
    user_hash = URI::decode_www_form(response.body).to_h
  end

  class << self
    def client
      TwitterApiClient.new
    end

    def access_token
      client.access_token
    end
  end
end
