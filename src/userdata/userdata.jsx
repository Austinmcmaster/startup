import React from 'react';

export function UserData() {
  return (
    <main>
      <table id = "DataTable">
        <thead>
            <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Time (Hours)</th>
            </tr>
        </thead>
      </table>
        <button id='tablebutton'>Clear Data</button>
        <div className="container">
            <form id="time_form">
                <h2>Time Entry</h2>
                <label htmlFor="Subect">Subject</label>
                <input type="text"id = "Subject" required = "text" placeholder="Enter a description for text."/>
                <label htmlFor="Time_in">Time In</label>
                <input type="time" id = "Time_in" required="time" placeholder="Enter Time in"/>
                <label htmlFor="Time_out">Time Out</label>
                <input type="time" id = "Time_out" required="time" placeholder="Enter Time out"/>
                <textarea name = "Description" id="descriptionbox" title="Description_Box" placeholder="Enter Description here." cols="30" rows="5"></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    </main>
  );
}