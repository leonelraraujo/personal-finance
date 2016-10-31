# personal-finance api

Personal Finance application API. All routes available are listed in `/swagger` route.

Folder structure based on the boilerplate https://github.com/devinivy/boilerplate-api.

## Running
1. Clone repo
2. Run `npm install`
3. Run `npm start`
4. API is now running at `http://localhost:3001`.

## TODO
- Integrate application logic (attributes and relations structure for all needed models).
    - ~~Add incomes~~
    - ~~Add expenses~~
    - ~~Add incomes categories~~
    - ~~Add expenses categories~~
    - Add value field (duh)
    - Add date of the payment/income
    - Add user overview
- Implement access management.
    - Registry and authentication with different services (local, Facebook, Google)
    - Policies
- Persistent data storage
    - ~~Integrate with local database for development~~
    - Integrate with remote database for production
    - Handle and automatize usage of development/production databases with NODE_ENV
- Document containerization and deployment guidelines.

# Issues
- Api prefix