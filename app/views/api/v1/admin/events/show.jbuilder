json.id @event.id
json.name @event.name
json.description @event.description
json.location do
  json.id @event.location.id
  json.name @event.location.name
end
json.starts @event.starts
json.ends @event.ends
