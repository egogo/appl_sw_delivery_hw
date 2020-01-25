class StaticController < ActionController::Base
  http_basic_authenticate_with name: "admin", password: "secret", only: :admin

  def index; end

  def admin; end
end
