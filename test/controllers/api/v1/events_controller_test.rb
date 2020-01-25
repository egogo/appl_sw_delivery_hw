require 'test_helper'
require 'json'

class Api::V1::EventsControllerTest < ActionDispatch::IntegrationTest
   test "/api/v1/events with no events" do
     get "/api/v1/events"
     assert_equal 200, status
     assert_equal JSON.parse(body, symbolize_names: true), {
         events: [],
         page: 1,
         per_page: 10,
         total: 0
     }
   end

   test "/api/v1/events with a few events" do
     location = FactoryBot.create :location
     first_event = FactoryBot.create(:event, starts: 10.days.ago, ends: 9.days.ago, location: location)
     second_event = FactoryBot.create(:event, starts: 10.days.from_now, ends: 11.days.from_now, location: location)
     third_event = FactoryBot.create(:event, starts: 2.days.from_now, ends: 3.days.from_now, location: location)
     fourth_event = FactoryBot.create(:event, starts: 4.days.from_now, ends: 4.days.from_now, location: location)

     get "/api/v1/events", params: { per_page: 2 }
     assert_equal 200, status
     assert_equal JSON.parse(body, symbolize_names: true), {
         events: [
             {
                 id: third_event.id,
                 name: third_event.name,
                 location: { name: location.name },
                 starts: third_event.starts.as_json,
                 ends: third_event.ends.as_json
             },
             {
                 id: fourth_event.id,
                 name: fourth_event.name,
                 location: { name: location.name },
                 starts: fourth_event.starts.as_json,
                 ends: fourth_event.ends.as_json
             }
         ],
         page: 1,
         per_page: 2,
         total: 3
     }

     get "/api/v1/events", params: { per_page: 2, page: 2 }
     assert_equal 200, status
     assert_equal JSON.parse(body, symbolize_names: true), {
         events: [
             {
                 id: second_event.id,
                 name: second_event.name,
                 location: { name: location.name },
                 starts: second_event.starts.as_json,
                 ends: second_event.ends.as_json
             }
         ],
         page: 2,
         per_page: 2,
         total: 3
     }
   end

   test "/api/v1/events/:id" do
     location = FactoryBot.create :location
     event = FactoryBot.create(:event, starts: 3.days.from_now, ends: 3.days.from_now, location: location)
     get "/api/v1/events/#{event.id}"
     assert_equal 200, status
     assert_equal JSON.parse(body, symbolize_names: true), {
         id: event.id,
         name: event.name,
         description: event.description,
         location: { name: location.name, address: location.full_address },
         starts: event.starts.as_json,
         ends: event.ends.as_json
     }
   end

   test "/api/v1/events/:id/sign_up with invalid email" do
     location = FactoryBot.create :location
     event = FactoryBot.create(:event, starts: 3.days.from_now, ends: 3.days.from_now, location: location)
     assert_no_enqueued_jobs
     post "/api/v1/events/#{event.id}/sign_up", params: {email: 'cacti'}
     assert_equal 422, status
     assert_equal JSON.parse(body, symbolize_names: true), {ok: false, errors: {email: ["is invalid"]}}
     assert_no_enqueued_jobs
   end

   test "/api/v1/events/:id/sign_up with valid email" do
     location = FactoryBot.create :location
     event = FactoryBot.create(:event, starts: 3.days.from_now, ends: 3.days.from_now, location: location)
     assert_no_enqueued_jobs
     post "/api/v1/events/#{event.id}/sign_up", params: {email: 'cacti@gmail.com'}
     assert_equal 200, status
     assert_equal JSON.parse(body, symbolize_names: true), {ok: true, errors: nil}
     assert_enqueued_jobs 2
   end

   test "/api/v1/events/:id/sign_up with valid email when already signed up" do
     location = FactoryBot.create :location
     event = FactoryBot.create(:event, starts: 3.days.from_now, ends: 3.days.from_now, location: location)
     assert_no_enqueued_jobs
     EventSignUp.create(event: event, email: 'cacti@gmail.com', skip_notifications: true)

     post "/api/v1/events/#{event.id}/sign_up", params: {email: 'cacti@gmail.com'}
     assert_equal 422, status
     assert_equal JSON.parse(body, symbolize_names: true), {ok: false, errors: {email: ["has already been taken"]}}
     assert_no_enqueued_jobs
   end
end
