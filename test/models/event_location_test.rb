require 'test_helper'

class EventLocationTest < ActiveSupport::TestCase
  test 'has events association' do
    location = FactoryBot.build :location
    assert_equal location.events, []
  end

  test 'validates presence of name' do
    location = FactoryBot.build :location, name: nil
    assert_equal location.valid?, false
    assert_equal location.errors.messages[:name], ["can't be blank"]
  end

  test 'validates presence of address' do
    location = FactoryBot.build :location, address: nil
    assert_equal location.valid?, false
    assert_equal location.errors.messages[:address], ["can't be blank"]
  end

  test 'validates presence of city' do
    location = FactoryBot.build :location, city: nil
    assert_equal location.valid?, false
    assert_equal location.errors.messages[:city], ["can't be blank"]
  end

  test 'validates presence of state' do
    location = FactoryBot.build :location, state: nil
    assert_equal location.valid?, false
    assert_equal location.errors.messages[:state], ["can't be blank"]
  end

  test 'validates presence of postal code' do
    location = FactoryBot.build :location, postal_code: nil
    assert_equal location.valid?, false
    assert_equal location.errors.messages[:postal_code], ["can't be blank"]
  end

  test 'validates presence of country' do
    location = FactoryBot.build :location, country: nil
    assert_equal location.valid?, false
    assert_equal location.errors.messages[:country], ["can't be blank"]
  end

  test '#full_address' do
    location = FactoryBot.build :location, address: "1 Main St", city: 'Cupertino',
                                           state: 'CA', postal_code: '95014', country: "USA"
    address = "1 Main St, Cupertino, CA, 95014, USA"
    assert_equal location.full_address, address
  end
end
