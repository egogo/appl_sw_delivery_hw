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
end
