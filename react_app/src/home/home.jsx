import React from 'react';
import './home.css'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip,Legend} from "chart.js";

export function Home() {
  const[subject ,setSubject] = React.useState('');
  const[time1, setTime1] = React.useState(null);
  const[time2, setTime2] = React.useState(null);
  const[desc, setdesc] = React.useState('');
  const[entries, setEntries] = React.useState([]);
  const[leaderboard_scores, setleaderboard_scores] = React.useState([]);
  const[webinput, setwebinput] = React.useState('');
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const[socket, setwebsocket] = React.useState(new WebSocket(`${protocol}://${window.location.host}/ws`));
  const[chat, setchat] = React.useState("");
  ChartJS.register(ArcElement,Tooltip,Legend);

  React.useEffect(() => {
    // Display that we have opened the webSocket
    socket.onopen = (event) => {
        appendMsg("WebSocket", "Connected to server");
        setwebsocket(socket);
    };

    socket.onmessage = async (event) => {
        const text = await event.data.text();
        const chat = JSON.parse(text);
        appendMsg( chat.name, chat.msg);
    };

    socket.onclose = (event) => {
        appendMsg('WebSocket', 'Has been disconnected');
        document.getElementById("web_button").disabled = true;
        document.getElementById("web_message").disabled = true;
        setwebsocket(null);
    };
  }, []);


  React.useEffect(() => {
    fetch('api/times')
      .then((response) => response.json())
      .then((data) => {
        setleaderboard_scores(data);
        localStorage.setItem('leaderboard', JSON.stringify(data));
      })
      .catch(() => {
        const data = localStorage.getItem('leaderboard');
        if (data) {
          setleaderboard_scores(JSON.parse(data));
        }
      });
  }, []);

  const leaderboardRows = [];
  if(leaderboard_scores.length){
    for(const [i, entry] of leaderboard_scores.entries()){
      leaderboardRows.push(
        <tr key ={i}>
          <td>{i + 1}</td>
          <td>{entry.username}</td>
          <td>{entry.Time}</td>
        </tr>
      );
    }
  }


  React.useEffect(() => {
    const user = JSON?.parse(localStorage.getItem('userObject'));
    fetch(`api/table/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        localStorage.setItem('table', JSON.stringify(data));
      })
      .catch(() => {
        const data = localStorage.getItem('table');
        if (data) {
          setEntries(JSON.parse(data));
        }
      });
  }, []);

  const entryRows = [];
  const values = [];
  const labels = [];
  const colors = ["purple","blue","red","green","black","orange","yellow","white","pink","DarkGreen", "DarkOrange", "DarkOrchid", "Dark Red","DarkSalmon"]
  if(entries.length){
    for(const [i,entry] of entries.entries()){
      entryRows.push(
        <tr key={i}>
          <td>{entry.Subject}</td>
          <td>{entry.Description}</td>
          <td>{entry.Time}</td>
        </tr>
      );
      values.push(entry.Time);
      labels.push(entry.Subject);
    }
  }
  else{
    entryRows.push(
      <tr key ='0'>
        <td colSpan='3'>Enter your first entry</td>
      </tr>
    );
  }


  const data = {
    datasets: [
        {
          label: "# of hours",
          data: values,
          backgroundColor: colors,
        }
        
    ],
    labels:labels
  }

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
    window.location.reload();
  }

  function appendMsg(user,msg){
    setchat(chat + `${user}: ${msg}\n`);
  }

  function sendMessage(){
    const msg = webinput;
    if(!!msg){
      const userObject = JSON?.parse(localStorage.getItem('userObject')); 
      const name = userObject.username; 
      appendMsg(name,msg);
      socket.send(`{"name": "${name}", "msg":"${msg}"}`);
      setwebinput('');
    }
  }

  const handleKeyDown = (event) => {
    if(event.key == "Enter"){
      event.preventDefault();
      sendMessage();
    }
  }

  

  return (
    <main className='HomePage'>
      <table className="Leaderboard" id="leaderboard">
        <tbody id='leaderboard_scores'>
        <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Time</th>
          </tr>
          {leaderboardRows}
        </tbody>
      </table>

      <table id="DataTable">
        <tbody>
            <tr>
              <th>Subject</th>
              <th>Description</th>
              <th>Time (Hours)</th>
            </tr>
            {entryRows}
          </tbody>
      </table>

      <div className="container">
        <form id="time_form" onSubmit={(e) => {createEntry(); e.preventDefault()}}>
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
          <Pie data = {data}/>
        </div>
      </div>

      <div className="weblabel">
        <label htmlFor="webchat">Web Chat</label>
        </div>
        <div className="webchat">
            <textarea type="text" id="webchat"title="Description_Box" cols="50" rows="8" value={chat} readOnly={true}></textarea>
            <br/>
            <input type="text" placeholder="Enter text here" id="web_message" required = "text" onChange={(e) => setwebinput(e.target.value)} value={webinput}/>
            <button id="web_button" onKeyDown={() => handleKeyDown()}  onClick={(e) => {sendMessage(); e.preventDefault()}}>Send Message</button>
        </div>

    </main>
  );
}