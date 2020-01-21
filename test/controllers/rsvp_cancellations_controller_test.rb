require 'test_helper'

class RsvpCancellationsControllerTest < ActionDispatch::IntegrationTest
   test "with existing signup" do
     location = FactoryBot.create :location
     event = FactoryBot.create(:event, starts: 3.days.from_now, ends: 3.days.from_now, location: location)
     signup = EventSignUp.create(event: event, email: 'cacti@gmail.com')

     get "/cancel_rsvp/#{signup.get_code}"

     assert_equal 200, status
     assert_template :cancelled
   end

   test "with non-existing signup" do
     location = FactoryBot.create :location
     event = FactoryBot.create(:event, starts: 3.days.from_now, ends: 3.days.from_now, location: location)
     signup = EventSignUp.create(event: event, email: 'cacti@gmail.com')
     code = signup.get_code
     signup.destroy

     get "/cancel_rsvp/#{code}"

     assert_equal 200, status
     assert_template :not_found
   end
end
