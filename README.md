# Time Analytics

## Startup deliverable - specification

### Elevator Pitch
Have you ever questioned how much time you have spent on certain acitvities, such as homework, hobbies or classes and want to understand where your time is most spent? This application is focused on adding entries which can be subjects, hobbies or other task and calculating your data in an easy format to see where your time is spent. So simply, a user inputs a subject along with a time entry. The server end will grab the data associated with them and create a pie chart / graph showing allocated time. The program will calculate highest average time per subject and display on a leaderboard. A chat service will also be accessible for users.
### Design
#### Home Page
![Home Page](/Images/Home%20Page.png)
#### Login Page
![Login Page](/Images/Login_Page.png)
#### User Data Page
![User Data Page](/Images/User_Data_Page.png)
#### Sequence Diagram
![Sequence Diagram for flow of website](/Images/Sequence%20Diagram.png)
Design flow of website. Could change with new ideas.
### Key Features
* Secure login over HTTPS
* Ability to create subject
* Create entry associted with subject
* Web Chat service with users
* Leaderboard of highest time activity per user.
* Entries are persienstenly stored in database.
* Pie chart / graph persistently updated 
* Admin can clear chat or spam data
* Filter graph data by day, week, or year

### Technology
* **Authentication**: The user will be able to login securly with a username and password. Credentials will be stored within a database. Can't access chat, leaderboard or the ability to submit submissions unless authenticated.
* **Database data**: Ther server will pull in data associted with the filter for time (day, week, year) and create a pie chart / graph associated. The graph will be divided by subject and display a percentage associated with each subject.
* **WebSocket data**: Websocket data will include a chat that users can use to communicate. Along with the implementation of the highest average time for a given subject in a leaderboard. The Websocket will update this data constantly as it is submitted. The chat can also be cleared by the admin.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

* **HTML pages**- Created three HTML Pages that represent Login, Home Page where users can view there data, and pie chart associated with the data. The leaderboard for data updates is displayed, along with a web socket for a chat. The pie chart is also will access the data and calculate the image later on. There is also a section to create new time entries. The last page for user data, can modify existing time entries. Also you can submit more entries.
* **Links**- The index.html, user data pages both links to all other pages. If login is sucessful then you move to home page.
* **Service calls placeholder**- I may implement a location feature when someone submits a new time entry. So I may want to do a google api call. As of right now an API to make a pie chart is my current place holder unless I can do that myself.
* **Text**- Dummy data is used for filling the current time entries.
* **Images**- Have a website logo for each of the pages
* **Login**- Input and password are implemented and if text is entered to both, then the submit button is accessible.
* **Database**- Pie Chart, time entries(with subjects), leaderboard updates. These are all associated with the database.
* **WebSocket**- The web chat input box will fulfill the websocket in the future.

## CSS deliverable

For this deliverable I properly styled the application into its final appearence though it may be changed as furthur functioanlity is added. For
exmaple the pie chart currently is just a css pie chart where as it will eventually be a caluclation later. I also added a sign up page for login 
capabilities just so a user can be added to a database. Stylying has been refined but, small changes may come. Its resizing will come with javascript in the future.

* **Header, footer and main content body**- Properly styled
* **Navigation elements**- They appear inside the header and have a hover animation. Spacing looks good.
* **Responsive to window resizing**- My pages resize and collapse elements. The pie chart is the only thing that does not collapse since it has a definite size
* **Application elements**- Gradient color, use of float and div tags allow elements to be next to each other and all elements desired for project are present. Contrast is present along with some gradient coloring.
* **Application text content**- consistent font with use of two colors. May be changed based off my preferences, consistent font used
* **Application images**- Logo is properly styled and in the header. Pie chart is also made with css and it looks pretty cool. Only images applicable.

## JavaScript deliverable

For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

* **Login**- The login/signup pages will both link to the new website if information is entered. Login will encapsulate your data and pass a fake username. Signup will pass the username to the website through storage and it will display on the website unless something is already using storage. Both use storage and are ready for Database entry.
* **Database**- Time entries are ready for the database along with login information. They are all stored locally for now. 
* **WebSocket**- Websocket applies to both leaderboard and webchat. The webchat will periodically put in some connection messages. This will implement the websocket for communication later. The leaderboard displays the users current top data, eventually once more users and sockets are implemented, all users will be displayed on the leaderboard.
* **Application Logic**- Logic implemented for time entries is avaiable on both datapage and home page. The data is also clearable which will update the leaderboard and the table display. The pie chart has not been updated yet, since I will be using node.js api. So in the next deliverable it will be ready to go.

## Startup Service
For this deliverable, I implemented backend points, that are used in various points in my implimentation. I have a table, user, times, endpoints which are used for storing data. I finished the pie chart implementation which updates once entries are submitted. Along with a leaderboard which keeps track of your current highest entry. Eventually it will connect with other users and there highest entries. Third party endpoint is simply cat quotes that is posted in the text area every refresh. Login and signup also work and store data at endpoints. Not sure if that was too much for this assignment.

* **Node.js/Express HTTP service**- Implemented.
* **Static middleware for frontend**- Implemented.
* **Third Party endpoints**- Fetch cat quotes that are used within the main page in the text area section. Fetch code located in main.js.
* **Backend service endpoint**- Setup, for table entries, users, and times for the leaderboard. Used to store data currently instead of local storage.
* **Front End Calls service endpoint**- All my storage is called using fetch for various reasons of filling the pie chart, leaderboard, table, along with login authentication as well.

## DB deliverable
For this deliverable I associate the enties with a specific user/ if loggined in/ or unknown/guest. 3 tables were created in the database, user, login and leaderboard. They each store data.

* **MongoDB Atlas database created**- done!
* **Provides backend endpoints for manipulating application data**- Stores data in the associated tables using previously established backpoints.
* **Stores application data in MongoDB**- done!

## Login deliverable
For this deliverable I now have authentication with authtokens and entries are only associated with a given user.
* **Supports new user registration**- Stores new user data in the mongodb table and returns authtoken
* **Supports existing user authentication**- Allows for a user to log into the website and view previous entries unless data was cleared with other functionality and store new entries with that user.
* **Stores and retrieves credentials in MongoDB**- Yes it stores this data in MongoDB
* **Restricts application functionality based upon authentication**- Leaderboard access, pie chart, and entrie submission are restricted and will not be accepted if a unauthenticated user tries to submit one. 