module LoginModule
  def login(user)
    session_params = { email: user.email, password: "password" }
    post api_sessions_path, params: session_params
  end
end
