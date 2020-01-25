require 'test_helper'

class Api::V1::Admin::LocationsControllerTest < ActionDispatch::IntegrationTest
    test "/api/v1/admin/locations without token" do
      get "/api/v1/admin/locations"
      assert_equal 401, status
    end

    test "/api/v1/admin/locations with no locations" do
      get "/api/v1/admin/locations", headers: AUTH_HEADER
      assert_equal 200, status
      assert_equal JSON.parse(body, symbolize_names: true), {items: []}
    end

    test "/api/v1/admin/locations with a few locations" do
      location_one = FactoryBot.create :location
      location_two = FactoryBot.create :location
      location_three = FactoryBot.create :location

      get "/api/v1/admin/locations", headers: AUTH_HEADER
      assert_equal 200, status
      assert_equal JSON.parse(body, symbolize_names: true), {items: [
          {
              id: location_one.id,
              name: location_one.name,
              address: location_one.full_address
          },
          {
              id: location_two.id,
              name: location_two.name,
              address: location_two.full_address
          },
          {
              id: location_three.id,
              name: location_three.name,
              address: location_three.full_address
          }
      ]}
    end

    test "POST /api/v1/admin/locations without token" do
      location_params = FactoryBot.build(:location).attributes.slice('name', 'address', 'city', 'state', 'postal_code', 'country')
      post "/api/v1/admin/locations", params: { location: location_params }, as: :json
      assert_equal 401, status
    end

    test "POST /api/v1/admin/locations with correct parameters" do
      location_params = FactoryBot.build(:location).attributes.slice('name', 'address', 'city', 'state', 'postal_code', 'country')
      post "/api/v1/admin/locations", params: { location: location_params }, headers: AUTH_HEADER, as: :json
      assert_equal 200, status
      location = EventLocation.first
      assert_equal JSON.parse(body, symbolize_names: true), {
          id: location.id,
          name: location.name,
          address: location.full_address
      }
    end

    test "POST /api/v1/admin/events with incorrect parameters" do
      location_params = FactoryBot.build(:location).attributes.slice('name', 'address', 'city')
      post "/api/v1/admin/locations", params: { location: location_params }, headers: AUTH_HEADER, as: :json
      assert_equal 422, status

      assert_equal JSON.parse(body, symbolize_names: true), {
          ok: false,
          errors: {
              postal_code: ["can't be blank"],
              country: ["can't be blank"],
              state: ["can't be blank"]
          }
      }
    end

    test "DELETE /api/v1/admin/locations/:id without token" do
      location = FactoryBot.create :location
      delete "/api/v1/admin/locations/#{location.id}"
      assert_equal 401, status
    end

    test "DELETE /api/v1/admin/locations/:id for existing location" do
      location = FactoryBot.create :location
      delete "/api/v1/admin/locations/#{location.id}", headers: AUTH_HEADER
      assert_equal 204, status
    end

    test "DELETE /api/v1/admin/locations/:id for non-existing location" do
      delete "/api/v1/admin/locations/123456", headers: AUTH_HEADER
      assert_equal 404, status
    end
end