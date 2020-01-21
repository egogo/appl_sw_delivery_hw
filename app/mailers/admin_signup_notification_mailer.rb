class AdminSignupNotificationMailer < ApplicationMailer
  default from: 'testtask@example.com'

  def signup_notification
    @event = params[:event]
    @user_email = params[:user_email]
    mail(to: Rails.configuration.signup_notification_email, subject: 'Someone signed up for event!')
  end
end
