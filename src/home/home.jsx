import React, { useState } from 'react';
import './home.css'

export function Home() {
  const[subject ,setSubject] = React.useState('');
  const[time1, setTime1] = React.useState(null);
  const[time2, setTime2] = React.useState(null);
  const[desc, setdesc] = React.useState('');

  function createEntry(){
    const getSeconds = s => s.split(":").reduce((acc, curr) => acc * 60 + +curr, 0)
    var end = getSeconds(time2);
    var start = getSeconds(time1);
    var res = Math.abs(end - start);
    var hours = Math.round(res / 60);
    const user = JSON?.parse(localStorage.getItem('userObject'));

    let tableObject = {
      Subject : subject,
      Description: desc,
      Time: hours,
      username: user.username,
      id: user.id,
      entryID: crypto.randomUUID(),
    };
    fetch('api/table', {
      method: 'POST',
      body: JSON.stringify(tableObject),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',},
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
      console.log(jsonResponse);
    });
  
    fetch('api/times', {
        method: 'POST',
        body: JSON.stringify(tableObject),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => response.json)
    .then((jsonResponse) => {
        console.log(jsonResponse);
    })
    
    setSubject('');
    setTime1(null);
    setTime2(null);
    setdesc('');
  }

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
            <form id="time_form" onSubmit={() => createEntry()}>
                <h2>Time Entry</h2>
                <label htmlFor="Subect">Subject</label>
                <input type="text"id = "Subject" required = "text" placeholder="Enter a associated subject" onChange={(e) => setSubject(e.target.value)}/>
                <label htmlFor="Time_in">Time In</label>
                <input type="time" id = "Time_in" required="time" placeholder="Enter Time in" onChange={(e) => setTime1(e.target.value)}/>
                <label htmlFor="Time_out">Time Out</label>
                <input type="time" id = "Time_out" required="time" placeholder="Enter Time out"  onChange={(e) => setTime2(e.target.value)}/>
                <label htmlFor="sub_descript">Description</label>
                <textarea name = "Description" id="descriptionbox" title="Description_Box" placeholder="Enter Description here." cols="30" rows="5"  onChange={(e) => setdesc(e.target.value)}></textarea>
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