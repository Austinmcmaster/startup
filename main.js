class TimeAnalytic {

    constructor(){
    const username = document.querySelector('.username_a');
    username.textContent= this.getUserName();
    
    }


    getUserName() {
        return localStorage.getItem('username') ?? "Unknown User";
    }
}

const timeAnalytic = new TimeAnalytic();