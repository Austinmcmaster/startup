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
