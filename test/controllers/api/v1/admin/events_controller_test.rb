require 'test_helper'

class Api::V1::Admin::EventsControllerTest < ActionDispatch::IntegrationTest
  test "/api/v1/admin/events without token" do
    get "/api/v1/admin/events"
    assert_equal 401, status
  end

  test "/api/v1/admin/events with no events" do
    get "/api/v1/admin/events", headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        events: [],
        page: 1,
        per_page: 10,
        total: 0
    }
  end

  test "/api/v1/admin/events with a few events" do
    location = FactoryBot.create :location
    first_event = FactoryBot.create(:event, starts: 10.days.ago, ends: 9.days.ago, location: location) # past event
    second_event = FactoryBot.create(:event, starts: 10.days.from_now, ends: 11.days.from_now, location: location)
    third_event = FactoryBot.create(:event, starts: 2.days.from_now, ends: 3.days.from_now, location: location)

    get "/api/v1/admin/events", params: { per_page: 2 }, headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        events: [
            {
                id: first_event.id,
                name: first_event.name,
                location: { name: location.name },
                starts: first_event.starts.as_json,
                ends: first_event.ends.as_json
            },
            {
                id: second_event.id,
                name: second_event.name,
                location: { name: location.name },
                starts: second_event.starts.as_json,
                ends: second_event.ends.as_json
            }
        ],
        page: 1,
        per_page: 2,
        total: 3
    }

    get "/api/v1/admin/events", params: { per_page: 2, page: 2 }, headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        events: [
            {
                id: third_event.id,
                name: third_event.name,
                location: { name: location.name },
                starts: third_event.starts.as_json,
                ends: third_event.ends.as_json
            }
        ],
        page: 2,
        per_page: 2,
        total: 3
    }
  end

  test "GET /api/v1/admin/events/:id without token" do
    location = FactoryBot.create :location
    event = FactoryBot.create(:event, starts: 10.days.ago, ends: 9.days.ago, location: location)
    get "/api/v1/admin/events/#{event.id}"
    assert_equal 401, status
  end

  test "GET /api/v1/admin/events/:id" do
    location = FactoryBot.create :location
    event = FactoryBot.create(:event, starts: 10.days.ago, ends: 9.days.ago, location: location)

    get "/api/v1/admin/events/#{event.id}", headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        id: event.id,
        name: event.name,
        description: event.description,
        location: { id: location.id, name: location.name },
        starts: event.starts.as_json,
        ends: event.ends.as_json
    }
  end

  test "POST /api/v1/admin/events without token" do
    location = FactoryBot.create :location
    event_params = FactoryBot.build(:event, starts: 10.days.ago, ends: 9.days.ago, location: location).attributes
                             .slice("location_id", "name", "description", "starts", "ends")
    post "/api/v1/admin/events", params: { event: event_params }, as: :json
    assert_equal 401, status
  end

  test "POST /api/v1/admin/events with correct parameters" do
    location = FactoryBot.create :location
    event_params = FactoryBot.build(:event, starts: 10.days.ago, ends: 9.days.ago, location: location).attributes
                             .slice("location_id", "name", "description", "starts", "ends")
    post "/api/v1/admin/events", params: { event: event_params }, headers: AUTH_HEADER, as: :json
    assert_equal 200, status
    event = Event.first
    assert_equal JSON.parse(body, symbolize_names: true), {
        id: event.id,
        name: event.name,
        description: event.description,
        location: { id: location.id, name: location.name },
        starts: event.starts.as_json,
        ends: event.ends.as_json
    }
  end

  test "POST /api/v1/admin/events with incorrect parameters" do
    location = FactoryBot.create :location
    event_params = FactoryBot.build(:event, starts: 10.days.ago, ends: 9.days.ago, location: location).attributes
                       .slice("location_id", "name", "ends")
    post "/api/v1/admin/events", params: { event: event_params }, headers: AUTH_HEADER, as: :json
    assert_equal 422, status

    assert_equal JSON.parse(body, symbolize_names: true), {
        ok: false,
        errors: {
            description: ["can't be blank"],
            starts: ["is not a valid datetime"]
        }
    }
  end

  test "PUT /api/v1/admin/events/:id without token" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    event_params = { name: 'new name!' }
    put "/api/v1/admin/events/#{event.id}", params: { event: event_params }, as: :json
    assert_equal 401, status
  end

  test "PUT /api/v1/admin/events/:id with correct parameters" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    event_params = { name: "new name!" }
    put "/api/v1/admin/events/#{event.id}", params: { event: event_params }, headers: AUTH_HEADER, as: :json
    assert_equal 204, status
    assert_equal "", body
    event.reload
    assert_equal event.name, 'new name!'
  end

  test "PUT /api/v1/admin/events/:id with incorrect parameters" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    event_params = { name: "" }
    old_name = event.name
    put "/api/v1/admin/events/#{event.id}", params: { event: event_params }, headers: AUTH_HEADER, as: :json
    event.reload
    assert_equal event.name, old_name
    assert_equal 422, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        ok: false,
        errors: {
            name: ["can't be blank"]
        }
    }
  end

  test "DELETE /api/v1/admin/events/:id without token" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    delete "/api/v1/admin/events/#{event.id}"
    assert_equal 401, status
  end

  test "DELETE /api/v1/admin/events/:id for existing event" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    delete "/api/v1/admin/events/#{event.id}", headers: AUTH_HEADER
    assert_equal 204, status
  end

  test "DELETE /api/v1/admin/events/:id for non-existing event" do
    delete "/api/v1/admin/events/123456", headers: AUTH_HEADER
    assert_equal 404, status
  end
end
