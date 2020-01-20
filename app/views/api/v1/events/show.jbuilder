json.id @event.id
json.name @event.name
json.description @event.description
json.location do
  json.name @event.location.name
  json.address @event.location.full_address
end
json.starts @event.starts
json.ends @event.ends
