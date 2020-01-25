require 'test_helper'
include Rails.application.routes.url_helpers

class UserSignupNotificationMailerTest < ActionMailer::TestCase
  test "#signup_confirmation" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    signup = FactoryBot.create :event_sign_up, event: event

    email = UserSignupNotificationMailer.with(
        event: event, user_email: signup.email, reservation: signup
    ).signup_confirmation

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['from@example.com'], email.from
    assert_equal [signup.email], email.to
    assert_equal "You've signed up for \"#{event.name}\"!", email.subject
    assert email.body.include?(cancellation_url(signup.get_code, only_path: true))
  end
end
