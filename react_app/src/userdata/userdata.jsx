import React from 'react';

export function UserData() {
  const[subject ,setSubject] = React.useState('');
  const[time1, setTime1] = React.useState(null);
  const[time2, setTime2] = React.useState(null);
  const[desc, setdesc] = React.useState('');
  const[entries, setEntries] = React.useState([]);

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
  if(entries.length){
    for(const [i,entry] of entries.entries()){
      entryRows.push(
        <tr key={i}>
          <td>{entry.Subject}</td>
          <td>{entry.Description}</td>
          <td>{entry.Time}</td>
        </tr>
      );
    }
  }
  else{
    entryRows.push(
      <tr key ='0'>
        <td colSpan='3'>Enter your first entry</td>
      </tr>
    );
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

  function clearData(){
    const user = JSON?.parse(localStorage.getItem('userObject'));
    fetch(`api/table/${user.id}`, {
      method: 'DELETE'})
      .then((response) => response.json())
      .then((jsonResponse) => {
      console.log(jsonResponse);
      setEntries([]);
      window.location.reload();
    });
  }

  return (
    <main>
      <table id = "DataTable">
        <tbody>
          <tr>
            <th>Subject</th>
            <th>Description</th>
            <th>Time (Hours)</th>
          </tr>
          {entryRows}
        </tbody>
      </table>
        <button id='tablebutton' onClick={() => clearData()}>Clear Data</button>
        <div className="container">
            <form id="time_form" onSubmit={(e) => {createEntry(); e.preventDefault()}}>
                <h2>Time Entry</h2>
                <label htmlFor="Subect">Subject</label>
                <input type="text"id = "Subject" required = "text" placeholder="Enter a description for text." onChange={(e) => setSubject(e.target.value)}/>
                <label htmlFor="Time_in">Time In</label>
                <input type="time" id = "Time_in" required="time" placeholder="Enter Time in" onChange={(e) => setTime1(e.target.value)}/>
                <label htmlFor="Time_out">Time Out</label>
                <input type="time" id = "Time_out" required="time" placeholder="Enter Time out" onChange={(e) => setTime2(e.target.value)}/>
                <textarea name = "Description" id="descriptionbox" title="Description_Box" placeholder="Enter Description here." cols="30" rows="5" onChange={(e) => setdesc(e.target.value)}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    </main>
  );
}