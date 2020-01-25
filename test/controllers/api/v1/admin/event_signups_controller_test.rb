require 'test_helper'

class Api::V1::Admin::EventSignupsControllerTest < ActionDispatch::IntegrationTest
  test "/api/v1/admin/events/:id/signups without token" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    get "/api/v1/admin/events/#{event.id}/signups"
    assert_equal 401, status
  end

  test "/api/v1/admin/events/:id/signups for non-existing event" do
    get "/api/v1/admin/events/123/signups", headers: AUTH_HEADER
    assert_equal 404, status
  end

  test "/api/v1/admin/events/:event_id/signups with no signups" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    get "/api/v1/admin/events/#{event.id}/signups", headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        signups: [],
        page: 1,
        per_page: 10,
        total: 0
    }
  end

  test "/api/v1/admin/events/:event_id/signups with a few signups" do
    location = FactoryBot.create :location
    event = FactoryBot.create(:event, starts: 10.days.from_now, ends: 11.days.from_now, location: location)
    first_signup = FactoryBot.create :event_sign_up, event: event
    second_signup = FactoryBot.create :event_sign_up, event: event
    third_signup = FactoryBot.create :event_sign_up, event: event

    get "/api/v1/admin/events/#{event.id}/signups", params: { per_page: 2 }, headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        signups: [
            {
                id: first_signup.id,
                email: first_signup.email,
                creation_date: first_signup.created_at.as_json
            },
            {
                id: second_signup.id,
                email: second_signup.email,
                creation_date: second_signup.created_at.as_json
            }
        ],
        page: 1,
        per_page: 2,
        total: 3
    }

    get "/api/v1/admin/events/#{event.id}/signups", params: { per_page: 2, page: 2 }, headers: AUTH_HEADER
    assert_equal 200, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        signups: [
            {
                id: third_signup.id,
                email: third_signup.email,
                creation_date: third_signup.created_at.as_json
            }
        ],
        page: 2,
        per_page: 2,
        total: 3
    }
  end

  test "POST /api/v1/admin/events/:event_id/signups without token" do
    location = FactoryBot.create :location
    event = FactoryBot.create(:event, location: location)
    signup_params = { email: Faker::Internet.email }
    post "/api/v1/admin/events/#{event.id}/signups", params: { signup: signup_params }, as: :json
    assert_equal 401, status
  end

  test "POST /api/v1/admin/events/:event_id/signups with correct parameters" do
    location = FactoryBot.create :location
    event = FactoryBot.create(:event, location: location)
    signup_params = { email: Faker::Internet.email }
    post "/api/v1/admin/events/#{event.id}/signups", params: { signup: signup_params }, headers: AUTH_HEADER, as: :json
    assert_equal 200, status
    signup = event.event_sign_ups.first
    assert_equal JSON.parse(body, symbolize_names: true), {
        id: signup.id,
        email: signup.email,
        creation_date: signup.created_at.as_json
    }
  end

  test "POST /api/v1/admin/events with incorrect parameters" do
    location = FactoryBot.create :location
    event = FactoryBot.create(:event, location: location)
    signup_params = { email: "not an email" }
    post "/api/v1/admin/events/#{event.id}/signups", params: { signup: signup_params }, headers: AUTH_HEADER, as: :json
    assert_equal 422, status
    assert_equal JSON.parse(body, symbolize_names: true), {
        ok: false,
        errors: {
            email: ["is invalid"]
        }
    }
  end

  test "DELETE /api/v1/admin/events/:event_id/signups/:id without token" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    signup = FactoryBot.create :event_sign_up, event: event
    delete "/api/v1/admin/events/#{event.id}/signups/#{signup.id}"
    assert_equal 401, status
  end

  test "DELETE /api/v1/admin/events/:event_id/signups/:id for existing event" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    signup = FactoryBot.create :event_sign_up, event: event
    delete "/api/v1/admin/events/#{event.id}/signups/#{signup.id}", headers: AUTH_HEADER
    assert_equal 204, status
  end

  test "DELETE /api/v1/admin/events/:event_id/signups/:id for non-existing signup" do
    location = FactoryBot.create :location
    event = FactoryBot.create :event, location: location
    delete "/api/v1/admin/events/#{event.id}/signups/123456", headers: AUTH_HEADER
    assert_equal 404, status
  end
end