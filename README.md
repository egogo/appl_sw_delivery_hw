## How to run:
Assumes you have yarn installed (`brew install yarn`)

`bundle install`

`rake db:migrate db:seed`

`yarn install`

`rails s`

# README

The tool should be submitted with a pre-defined events in the data store. Events should have the following fields identified:
- An event will have a name
- An event will have a location
- An event will have a start and end time
- An event will have a unique identifier

The tool should accept an email address as a unique identification for a user (when signing up for an event).

The tool should allow the user to
- List all events
- Sign up for an event
- Remove email address from event

When signing up for an event the tool should email a pre-defined email address with a notification.

All properties (i.e. the pre-defined email address) should be easy to change before deployment.

All event times will be in the same timezone.

An event can span multiple days.

## Deliverables
### Critical
- The code should be build and deploy locally (no dependencies on AWS, Heroku, or other external services)
- Email services should rely on configurable SMTP servers and not 3rd party solutions.
- There should be documentation on how to start the application
- All dependencies should be crafted in their associated package managers (Gemfile, requirements.txt, etc)
- The backend code should be written in Python, Ruby, or Perl.
- The code should use SQLite as a datastore.
- The REST endpoints should be well documented for public consumption
- The provided email address can only sign up a unique event once
### Nice to Have
- The code should have and pass all unit tests
- The tool should have API endpoints for managing events
- The tool should have a front end (written in JS) for signing up for events / managing events.
- The tool should email the provided email address with a calendar invitation to the event.
- The tool should have APIs (protected with an fixed API key) that allow an administrator to:
    - See all people who signed up for an event
    - Remove an arbitrary email address from an event
    - Sign up a arbitrary email address to an event