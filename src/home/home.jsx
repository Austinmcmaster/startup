import React from 'react';
import './home.css'

export function Home() {
  return (
    <main className='HomePage'>
      <table className="Leaderboard" id="leaderboard">
        <thead id='header'>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody id='leaderboard_scores'></tbody>
      </table>

      <table id="DataTable">
        <thead>
          <tr>
              <th>Subject</th>
              <th>Description</th>
              <th>Time (Hours)</th>
          </tr>
        </thead>
        <tbody id='time_entries'></tbody>
      </table>

      <div className="container">
            <form id="time_form">
                <h2>Time Entry</h2>
                <label htmlFor="Subect">Subject</label>
                <input type="text"id = "Subject" required = "text" placeholder="Enter a associated subject"/>
                <label htmlFor="Time_in">Time In</label>
                <input type="time" id = "Time_in" required="time" placeholder="Enter Time in"/>
                <label htmlFor="Time_out">Time Out</label>
                <input type="time" id = "Time_out" required="time" placeholder="Enter Time out"/>
                <label htmlFor="sub_descript">Description</label>
                <textarea name = "Description" id="descriptionbox" title="Description_Box" placeholder="Enter Description here." cols="30" rows="5"></textarea>
                <button className = "entry_button" type="submit">Submit</button>
            </form>

            <div className="pieContainer">
            <canvas id = "pieChart" width="400" height="400"></canvas>    
            </div>
      </div>

      <div className="weblabel">
        <label htmlFor="webchat">Web Chat</label>
        </div>
        <div className="webchat">
            <textarea type="text" id="webchat"title="Description_Box" cols="50" rows="8">
            </textarea>
            <br/>
            <input type="text" placeholder="Enter text here" id="web_message" required = "text"></input>
            <button id="web_button">Send Message</button>
        </div>

    </main>
  );
}