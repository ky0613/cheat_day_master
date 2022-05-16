class AddAccessTokenColumnsToAuthentications < ActiveRecord::Migration[6.1]
  def change
    add_column :authentications, :access_token, :string
    add_column :authentications, :access_token_secret, :string
  end
end
