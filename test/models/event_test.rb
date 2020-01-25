require 'test_helper'

class EventTest < ActiveSupport::TestCase
  test 'has location association' do
    location = FactoryBot.build :location
    event = FactoryBot.build :event, location: location
    assert_equal event.location, location
  end

  test 'has event_sign_ups association' do
    location = FactoryBot.build :location
    event = FactoryBot.create :event, location: location
    event_sign_up = FactoryBot.create :event_sign_up, event: event
    assert_equal event.event_sign_ups, [event_sign_up]
  end

  test 'validates presence of name' do
    event = FactoryBot.build :event, name: nil
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:name], ["can't be blank"]
  end

  test 'validates presence of description' do
    event = FactoryBot.build :event, description: nil
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:description], ["can't be blank"]
  end

  test 'validates presence of location' do
    event = FactoryBot.build :event, location: nil
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:location], ["must exist", "can't be blank"]
  end

  test 'validates presence of starts' do
    event = FactoryBot.build :event, starts: nil, ends: 1.day.from_now
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:starts], ["is not a valid datetime"]
  end

  test 'validates starts is a datetime' do
    event = FactoryBot.build :event, starts: "not a datetime", ends: 1.day.from_now
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:starts], ["is not a valid datetime"]
  end

  test 'validates presence of ends' do
    event = FactoryBot.build :event, ends: nil
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:ends], ["is not a valid datetime"]
  end

  test 'validates ends is a datetime' do
    event = FactoryBot.build :event, ends: "not a date"
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:ends], ["is not a valid datetime"]
  end

  test 'validates starts is before ends' do
    event = FactoryBot.build :event, starts: 2.days.from_now, ends: 1.day.from_now
    assert_equal event.valid?, false
    assert_equal event.errors.messages[:ends][0].starts_with?("must be after"), true
  end
end
