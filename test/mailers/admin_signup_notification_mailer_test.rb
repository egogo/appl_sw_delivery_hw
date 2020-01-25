require 'test_helper'

class AdminSignupNotificationMailerTest < ActionMailer::TestCase
   test "#signup_notification" do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location, name: 'Fake event'
     signup = FactoryBot.create :event_sign_up, event: event

     email = AdminSignupNotificationMailer.with(
         event: event, user_email: signup.email
     ).signup_notification

     assert_emails 1 do
       email.deliver_now
     end

     assert_equal ['from@example.com'], email.from
     assert_equal ["admin@email.com"], email.to
     assert_equal 'Someone signed up for event!', email.subject
     assert email.body.include?(signup.email)
     assert email.body.include?(event.name)
   end
end
