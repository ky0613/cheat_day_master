RakutenWebService.configure do |c|
  c.application_id = Rails.application.credentials.rakuten[:token].to_s
end
