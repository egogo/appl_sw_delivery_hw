class UserSignupNotificationMailer < ApplicationMailer
  def signup_confirmation
    # TODO: add ics attachment
    @event = params[:event]
    @reservation = params[:reservation]
    @user_email = params[:user_email]
    @reservation_cancelation_url = cancellation_url(@reservation.get_code)

    mail(to: @user_email, subject: "You've signed up for \"#{@event.name}\"!")
  end
end
