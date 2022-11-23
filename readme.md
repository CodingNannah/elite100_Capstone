## MERN capstone project
    Frameworks: React & Express
    Database: MongoDB 
        - Atlas (cloud) & Compass (desktop manager)
    Backend environment: Node.js
    Framework(s):
    Language: JS

    API: Internal REST API called "Goals"
    3rd-Party Web API:

    CRUD: user goals

    HTTP API client creator/tester: Postman

## Run Project on Your Browser
npm run client


#### Additonal programs used during the creation of this app:
   * Postman desktop (for troubleshooting not accessible by web app)- http://localhost:5000/api/goals
   * Mongoose - Object Data Manager to interact with MongoDB
   * bcryptjs - data encryption
   * jsonwebtoken - tokens
   * Redux & Redux Chrome Toolkit


## Difficulties:
    MongoDB would not initialize properly (auth errors)
        CodingNannah: admin user (never authorized)
        dbUser: read & write user that authorized 

    Learning about optional code labeled serviceWorker. I still don't entirely get it, but to have things load faster (I'm understanding React is slow.), that's great!

    Secret Key in JS? 
        Python = import secrets & secrets.token_urlsafe(25)
        Just created my own

    Remembering to git & restart the npm server often

    Node/React Errors ARE NOT precise. It was sometimes rough to find the 'little things' I oopsed(unclosed brackets, misspellings; section the same that I copied and pasted and put in the wrong spot; my tendency to rename things, etc.).

    Deciding I wanted to do a React project (even more a MERN), without having finished Day 3 of React week.

    Needing SO many breaks, because my head was exploding or oversaturated like a sponge needing to be wrung out.
        

## Things I learned that I probably should already have known:
    rfce - exports at the bottom of js/jsx pages
    npm install with --save is supposed to ensure that everything is saved to the package.json files
    DON'T forget to keep testing pieces!!!!!!


## Expansion Plans:

    backend/models/userModel 
        drop-down option for choosing primary role on site:
        Guest
        Caregiver
        Mental Health Professional
        Donor
        Volunteer
            Admin (behind scenes; NOT a drop-down option!)
