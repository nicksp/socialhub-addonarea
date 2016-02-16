# SocialHub AddonArea

Addon area for SocialHub.

## Prerequisites

  - npm i -g gulp nodemon

## Steps to start thing up

  - git clone https://github.com/nicksp/socialhub-addonarea.git
  - cd socialhub-addonarea
  - mongorestore -d addonsTest dump
  - npm install
  - npm start
  - open http://localhost:1330/ in your browser

## Project description

### Use cases

- As an admin I want to be able to trigger a notification for new addons. Come up with a concept of how an issue could be tackled.
- As a user I want to be notified if a new addon is released. For the scope of that project we could trigger which addon should be marked as new by using var in localStorage.
- As a user I want to be able to view a list of currently available addons (the available addons are listed in the account object: account.features and account.premiumFeatures).
Each addon should have a title, description and optional image.
- As a user I want to be able to de-/activate addons.
There are also premium features which can’t be activated directly by a user. If the
user tries to do so:
  - a) an email is sent to the sales department (for this project we send it to addonstest@mailinator.com ). The mail should contain the ac/count and username + which addon should be enabled.

### Dev tasks

- Implement a simple backend using express and mongodb with the following routes:
  - a. GET accounts needed for the account name and the list of features
  - b. PUT accounts/:id for updating the features
  - c. GET users needed for displaying the user in the email
- Create a simple backbone application. Add a new addons page to which you can navigate through a link in the header.
