require 'test_helper'
require 'base64'

class EventSignUpTest < ActiveSupport::TestCase
   include ActiveJob::TestHelper

   test "has event association" do
     event = FactoryBot.build :event
     signup = FactoryBot.build :event_sign_up, event: event
     assert_equal signup.event, event
   end

   test "validates presence of email" do
     location = FactoryBot.build :location
     event = FactoryBot.build :event, location: location
     signup = FactoryBot.build :event_sign_up, event: event, email: ''
     signup.valid?
     assert_equal signup.errors.of_kind?(:email, :blank), true
   end

   test "validates presence of event" do
     signup = FactoryBot.build :event_sign_up
     signup.valid?
     assert_equal signup.errors.of_kind?(:event_id, :blank), true
   end

   test "validates presence format of email" do
     signup = FactoryBot.build :event_sign_up, email: 'cacti'
     signup.valid?
     assert_equal signup.errors.of_kind?(:email, :invalid), true
   end

   test "validates uniqueness of email+event_id" do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     existing_signup = FactoryBot.create :event_sign_up, event: event
     signup = FactoryBot.build :event_sign_up, event: event, email: existing_signup.email

     signup.valid?

     assert_equal signup.errors.of_kind?(:email, :taken), true
   end

   test "#get_code base64 encodes 'event_id-signup_id' combo" do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     signup = FactoryBot.create :event_sign_up, event: event
     assert_equal signup.get_code, Base64.urlsafe_encode64("#{event.id}-#{signup.id}")
   end

   test '.find_by_code finds record by code' do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     signup = FactoryBot.create :event_sign_up, event: event
     code = Base64.urlsafe_encode64("#{event.id}-#{signup.id}")
     assert_equal EventSignUp.find_by_code(code), signup
   end

   test '.find_by_code returns nil for non-existing records' do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     signup = FactoryBot.create :event_sign_up, event: event
     code = Base64.urlsafe_encode64("#{event.id}-#{signup.id}")

     signup.destroy

     assert_nil EventSignUp.find_by_code(code)
   end

   test '.find_by_code returns nil for random string' do
     assert_nil EventSignUp.find_by_code("cacti")
   end

   test '#create with valid email and not signed up' do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     assert_equal EventSignUp.count, 0

     assert_enqueued_jobs 2, only: [ActionMailer::MailDeliveryJob] do
       EventSignUp.create(email: 'cacti@gmail.com', event: event)
     end

     assert_equal enqueued_jobs.map {|j| j[:args][0..1] }, [
         ["AdminSignupNotificationMailer", "signup_notification"],
         ["UserSignupNotificationMailer", "signup_confirmation"]
     ]

     assert_equal EventSignUp.count, 1
   end

   test '#create with valid email and already signed up' do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     FactoryBot.create :event_sign_up, email: 'cacti@gmail.com', event: event, skip_notifications: true
     assert_equal EventSignUp.count, 1

     assert_enqueued_jobs 0 do
       EventSignUp.create(email: 'cacti@gmail.com', event: event)
     end

     assert_equal EventSignUp.count, 1
   end

   test '#sign_up_email! with invalid email' do
     location = FactoryBot.create :location
     event = FactoryBot.create :event, location: location
     assert_equal EventSignUp.count, 0

     assert_enqueued_jobs 0 do
       EventSignUp.create(email: 'cacti@g', event: event)
     end

     assert_equal EventSignUp.count, 0
   end
end
