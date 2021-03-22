# REST API Blog
A blog application that interacts with faux REST API: JSON Server.
<br>

# Viewing/Using this Application in a Development Environment

### 1. Type *__npm install__* in a terminal window to install dependencies.

### 2. Type *__npm run api__* in a terminal window to start the JSON Server REST API.

### 3. Type *__nodemon app__* in a separate terminal to run the blog application.

### 4. Navigate to *__http://localhost:3000/__* to view the application.
<br>

# Current Working Functionality

# Site Wide:
- Fully responsive navbar with 3 links. 
- Search form successfully queries the blog posts for keywords and returns the results ordered by most recent first.
- Fully responsive dummy footer replete with social media & 3 sets of other dummy links. 

## Landing Page Features:
- A header and page intro with content hinting.
- The full list of blog articles sorted by date (most recent first).
- Each article "card" links to the actual article page.
- Article thumbnails are responsive & look good on all screens.

## Blog Article Page Features:
- A header with a rotating health-related inspirational quote.
- The blog post itself including: Title, author, author's photo, post photo, date published and content. All 
  laid out in a clean minimalist design in keeping with the tone of the site.
- The add comment form sits above the comments themselves for good UX.
- Comments are displayed in a single column, most recent listed first.
- Adding comments is fully functional.
- Replying & deleting comments is not functional.

## Back-End
- The index page fetches blog listings successfully from the JSON-Server API.
- The blog post page fetches a single blog post from the JSON-SERVER API.
- The add comment form fetches a POST request from the JSON-SERVER API.
- The site is connected successfully to MongoDB 
- User registration works, the user data is validated by Joi, the user password is hashed using 
  bcrypt and users are saved to a User object in Mongo.

<br>

# Future Potential Functionality
- Pagination of the index page blog listings.
- Registered users can login & a session is started when they do.
- Only logged in users can comment.
- Users can delete and edit their own comments.
- There is also an admin login.
- Admins can create new blog posts.
- Admins can edit & delete blog posts.

<br>

# Libraries / Frameworks / Tech Used

## - [Node.js](https://nodejs.org/en/)
## - [Express.js](https://expressjs.com/)
## - [npm](https://www.npmjs.com/)
## - [MongoDB](https://www.mongodb.com/)
## - [Mongoose](https://mongoosejs.com/)
## - [EJS](https://ejs.co/)
## - [Bootstrap](https://getbootstrap.com/)

<br>

# Attribution

- Photo by <a href="https://unsplash.com/@bryanmgarces?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bryan Garces</a> on <a href="/s/photos/light-blue?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@yogidan2012?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Daniele Levis Pelusi</a> on <a href="/s/photos/light-blue?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@nivroz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Niv Rozenberg</a> on <a href="/s/photos/city-scape?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Scott Webb</a> on <a href="/s/photos/science?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@jipy32?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jean-Philippe Delberghe</a> on <a href="/s/photos/pattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@eskandthewood?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Silvio Kundt</a> on <a href="/s/photos/pattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@fellowferdi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ferdinand Stöhr</a> on <a href="/s/photos/pattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annie Spratt</a> on <a href="/s/photos/pattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@danielcgold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dan Gold</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@lukechesser?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luke Chesser</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonathan Borba</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@hush52?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hush Naidoo</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@jonflobrant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jon Flobrant</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kelly Sikkema</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@nofilter_noglory?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Goedhart</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@jessbaileydesigns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jess Bailey</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@heftiba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Toa Heftiba</a> on <a href="/s/photos/health?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@victoriabcphotographer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Christina Victoria Craft</a> on <a href="/s/photos/pills?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@oksanataran?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Oksana Taran</a> on <a href="/s/photos/yoga?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- Photo by <a href="https://unsplash.com/@nightcoder?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yuriy Kovalev</a> on <a href="/s/photos/clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
  