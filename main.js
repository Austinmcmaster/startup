class TimeAnalytic {

    constructor(){
    const username = document.querySelector('.username_a');
    username.textContent= localStorage.getItem('username') ?? 'Unknown';
    
    }


    getUserName() {
        return localStorage.getItem('username') ?? "Unknown User";
    }
}

const timeAnalytic = new TimeAnalytic();