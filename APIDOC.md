## API Documentation

### Public

#### Get the list of upcoming events, sorted by event date ascending:

`GET /api/v1/events`

Params:
- page (number) - page to display
- per_page (number) - number of items per page

`curl http://localhost:3000/api/v1/events?per_page=5`

Status: 200

Body:
```json
{
  "events":[
    {
      "id":297,
      "name":"All right, Mr. DeMille, I'm ready for my closeup.",
      "location":{
        "name":"Snorlab"
      },
      "starts":"2020-01-25T00:00:00.000Z",
      "ends":"2020-09-18T00:00:00.000Z"
    },
    ...
  ],
  "page":1,
  "per_page":5,
  "total":2000
}
```

#### Get event by id:

`GET /api/v1/events/:id`

`curl http://localhost:3000/api/v1/events/297`

Status: 200

Body:
```json
{
  "id":297,
  "name":"All right, Mr. DeMille, I'm ready for my closeup.",
  "description":"Dead on the inside, dead on the outside",
  "location":{
    "name":"Snorlab",
    "address":"80704 Rosario Ways, NH, 87387, Saint Kitts and Nevis"
  },
  "starts":"2020-01-25T00:00:00.000Z",
  "ends":"2020-09-18T00:00:00.000Z"
}
```

#### Sign up for an event:

`POST /api/v1/events/:id/sign_up`

Params:
- email (string, required) - an email of the user willing to sign up  

Valid email:

`curl -X POST http://localhost:3000/api/v1/events/297/sign_up -d "email=email@gmail.com"`

Status: 200

Body:
```json
{
  "ok":true,
  "errors":null
}
```

Invalid email or already subscribed:

`curl -X POST http://localhost:3000/api/v1/events/297/sign_up -d "email=not_really_an_email"`

Status: 422

Body:
```json
{
  "ok":false,
  "errors":{
    "email": ["is invalid"]
  }
}
```


### Admin/Event management

Requires X-Authorization header with a token.

#### Get the list of all events:

`GET /api/v1/admin/events`

Params:
- page (number, optional) - page to display
- per_page (number, optional) - number of items per page

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" http://localhost:3000/api/v1/admin/events?per_page=5`
Status: 200

Body:
```json
{
  "events":[
    {
      "id":1,"name":"Toto, I've got a feeling we're not in Kansas anymore.",
      "location":{
        "name":"On a Cob Planet"
      },
      "starts":"2020-02-23T00:00:00.000Z",
      "ends":"2020-12-12T00:00:00.000Z"
    },
    ...
  ],
  "page":1,
  "per_page":5,
  "total":2000
}
```

#### Get detailed event info:

`GET /api/v1/admin/events/:id`

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" http://localhost:3000/api/v1/admin/events/1`

Status: 200

Body
```json
{
  "id":1,
  "name":"Toto, I've got a feeling we're not in Kansas anymore.",
  "description":"I don't understand how people live. It's amazing to me that people wake up every morning and say: 'Yeah, another day, let's do it.' How do people do it? I don't know how",
  "location":{
    "id":14,
    "name":"On a Cob Planet"
  },
  "starts":"2020-02-23T00:00:00.000Z",
  "ends":"2020-12-12T00:00:00.000Z"
}
```

#### Create an event:

`POST /api/v1/admin/events`

Params:
- event[name] (string, required) - name/title of the event
- event[description] (string, required) - description of the event
- event[location_id] (number, required) - id of the Location object
- event[starts] (datetime string, required) - start date and time of the event
- event[ends] (datetime string, required) - end date and time of the event


With valid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X POST http://localhost:3000/api/v1/admin/events -d "event[name]=Test&event[description]=Test description&event[location_id]=2&event[starts]=2020-02-23T00:00:00.000Z&event[ends]=2020-02-23T16:00:00.000Z"`
Status: 204

Body:
```json
{
  "id":2003,
  "name":"Test",
  "description":"Test description",
  "location":{
    "id":2,
    "name":"Arbolez Mentorosos"
  },
  "starts":"2020-02-23T00:00:00.000Z",
  "ends":"2020-02-23T16:00:00.000Z"
}
```

With invalid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X POST http://localhost:3000/api/v1/admin/events -d "event[name]=Test&event[description]=Test description"`

Status: 422

Body:
```json
{
  "ok":false,
  "errors":{
    "location":["must exist","can't be blank"],
    "starts":["is not a valid datetime"],
    "ends":["is not a valid datetime"]
  }
}
```

#### Update an event:

`PUT /api/v1/admin/events/:id`

Params:
- event[name] (string) - name/title of the event
- event[description] (string) - description of the event
- event[location_id] (number) - id of the Location object
- event[starts] (datetime string) - start date and time of the event
- event[ends] (datetime string) - end date and time of the event


With valid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X PUT http://localhost:3000/api/v1/admin/events/297 -d "event[name]=Test"`

Status: 204 

Body: none

With invalid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X PUT http://localhost:3000/api/v1/admin/events/297 -d "event[name]="`

Status: 422 

Body:
```json
{
  "ok":false,
  "errors":{
    "name":["can't be blank"]
  }
}
```

#### Delete an event:

`DELETE /api/v1/admin/events/:id`

Event that exists:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X DELETE http://localhost:3000/api/v1/admin/events/297`

Status: 204 

Body: none

Non-existing event:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X DELETE http://localhost:3000/api/v1/admin/events/297"`

Status: 404 

Body: none


#### Get the list of locations:

`GET /api/v1/admin/locations`

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" http://localhost:3000/api/v1/admin/locations`

Status: 200

Body:
```json
{
  "items":[
    {
      "id":12,
      "name":"Parblesnops",
      "address": "1 Main st, Cupertino, 95014, USA"
    },
    ...
  ]
}
```

#### Create new location:

`POST /api/v1/admin/locations`

Params:
- location[name] (string, required) - name/title of the location
- location[address] (string, required) - street address of the location
- location[city] (string, required) - city of the location
- location[state] (string, required) - state of the location
- location[postal_code] (string, required) - postal code of the location
- location[country] (string, required) - country of the location

With valid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X POST http://localhost:3000/api/v1/admin/locations -d "location[name]=Location Name&location[address]=1 Main st&location[city]=Cupertino&location[state]=CA&location[country]=USA&location[postal_code]=95014"`

Status: 200

Body:
```json
{
  "id":22,
  "name":"Location Name",
  "address":"1 Main st, Cupertino, 95014, USA"
}
```

With invalid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X POST http://localhost:3000/api/v1/admin/locations -d "location[name]=Location Name&location[address]=1 Main st&location[city]=Cupertino"`

Status: 422

Body:
```json
{
  "ok":false,
  "errors":{
    "postal_code":["can't be blank"],
    "country":["can't be blank"],
    "state":["can't be blank"]
  }
}
```

#### Delete a location:

`DELETE /api/v1/admin/locations/:id`

Existing location:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X DELETE http://localhost:3000/api/v1/admin/locations/22`

Status: 204

Body: none

Non-existing location:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X DELETE http://localhost:3000/api/v1/admin/locations/1234567`

Status: 404

Body: none


#### Get the list of sign-ups for an event:

`GET /api/v1/admin/events/:event_id/signups`

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" http://localhost:3000/api/v1/admin/events/123/signups`

Status: 200

Body:
```json
{
  "signups":[
    {
      "id":1,
      "email":"email@gmail.com",
      "creation_date":"2020-01-24T22:53:28.039Z"
    },
    ...
  ],
  "page":1,
  "per_page":10,
  "total":10
}
```

#### Create a new sign-up for an event:

`POST /api/v1/admin/events/:event_id/signups`

Params:
- signup[email] (string, required) - email of the user signing up

With valid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X POST http://localhost:3000/api/v1/admin/events/123/signups -d "signup[email]=email@gmail.com"`

Status: 200

Body:
```json
{
  "id":1,
  "email":"email@gmail.com",
  "creation_date":"2020-01-24T22:53:28.039Z"
}
```

With invalid params:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X POST http://localhost:3000/api/v1/admin/events/123/signups -d "signup[email]=not an email"`

Status: 422

Body:
```json
{
  "ok":false,
  "errors":{
    "email":["is invalid"]
  }
}
```

#### Delete a signup for an event:

`DELETE /api/v1/admin/events/:event_id/signups/1`

Existing location:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X DELETE http://localhost:3000/api/v1/admin/events/123/signups/1`

Status: 204

Body: none

Non-existing location:

`curl -H "X-Authorization: Bearer ADMIN_API_KEY" -X DELETE http://localhost:3000/api/v1/admin/locations/1234567`

Status: 404

Body: none
