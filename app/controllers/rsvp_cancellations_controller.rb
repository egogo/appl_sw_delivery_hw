class RsvpCancellationsController < ActionController::Base
  def cancel
    @signup = EventSignUp.find_by_code(params[:code])

    if @signup
      @signup.destroy
      render :cancelled
    else
      render :not_found
    end
  end
end
