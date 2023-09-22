# Time Analytics

## Startup deliverable - specification

### Elevator Pitch
Have you ever questioned how much time you have spent on certain acitvities, such as homework, hobbies or classes and want to understand where your time is most spent? This application is focused on adding entries which can be subjects, hobbies or other task and calculating your data in an easy format to see where your time is spent. So simply, a user inputs a subject along with a time entry. The server end will grab the data associated with them and create a pie chart / graph showing allocated time. The program will calculate highest average time per subject and display on a leaderboard. A chat service will also be accessible for users.
### Design
![Home Page](/Images/Home%20Page.png)
![Login Page](/Images/Login_Page.png)
![User Data Page](/Images/User_Data_Page.png)
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
* **WebSocket data**: Websocket data will include at chat that users can use to communicate. Along with the implementation of the highest average time for a given subject in a leaderboard. The Websocket will update this data constantly as it is submitted. The chat can also be cleared by the admin.  
