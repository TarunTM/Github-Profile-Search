const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const btnsubmit = document.getElementById("submit");
const url = "https://api.github.com/users/";
const input = document.getElementById("input");
const noresults = document.getElementById("no-results");
const btnmode = document.getElementById("btn-mode");
const avatar = document.getElementById("avatar");
const userName =document.getElementById("name");
const user = document.getElementById("user");
const date =document.getElementById("date");
const bio = document.getElementById("bio");
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const userLocation =document.getElementById("location");
const page = document.getElementById("page");
const twitter = document.getElementById("twitter");
const company =document.getElementById("company");
const modetext = document.getElementById("mode-text");
const modeicon = document.getElementById("mode-icon");


let darkmode = false;

btnsubmit.addEventListener("click" , function(){
    if(input.value !== ""){
        getUserData(url + input.value);
    }
});

input.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        if(input.value !== ""){
            getUserData(url + input.value);
        }
    }     
});

input.addEventListener("input" , function(){
    noresults.style.display = "none";
});

btnmode.addEventListener("click" , function(){
    if(darkmode == false){
        darkModeProperties();
        }
    else{
        lightModeProperties();
    }
});

async function getUserData(giturl){
    try{
        const response = await fetch(giturl);
        const data = await response.json();

        
        console.log(data);
        updateProfile(data);
    }
    catch(error){
        console.log("api BT");
    }
    
}

function updateProfile(data){
    if(data.message != "Not Found"){
        noresults.style.display = "none";
    
        function checkNull(para1 , para2){
            if(para1 === "" || para1 === null){
                para2
                return false;
            }
            else{
                return true;
            }
        }

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        const dateSegments = data.created_at.split("T").shift().split("-");
        date.innerHTML = `Joined ${dateSegments[2]} ${month[dateSegments[1]-1]} ${dateSegments[0]} ` ;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText =`${data.following}`;
        userLocation.innerText = checkNull(data.location , userLocation) ? `${data.location}` : "Not Available";
        page.innerText = checkNull(data.blog, page) ? `${data.blog}` : "Not Available" ;
        page.href = checkNull(data.blog,page) ? `${data.blog}` : "#";
        twitter.innerText = checkNull(data.twitter_username , twitter) ? `${data.twitter_username}` : "Not Available" ;
        twitter.href = checkNull(data.twitter_username , twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company,company) ? `${data.company}` : "Not Available";
        searchbar.classList.toggle("active");
        // profilecontainer.classList.toggle("active");
    }
    else{
        console.log("no results")
        noresults.style.display = "block";
    }
}

function darkModeProperties(){
    root.setProperty("--lm-bg","#141D2F");
    root.setProperty("--lm-bg-content","#1E2A47");
    root.setProperty("--lm-text","white");
    root.setProperty("--lm-text-alt","white");
    root.setProperty("--lm-shadow","rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg","brightness(1000%)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/sun-icon.svg";
    console.log("darkmode");
    darkmode = true;
    localStorage.setItem("dark-mode", darkmode);
}

function lightModeProperties(){
    root.setProperty("--lm-bg","#f6f8ff");
    root.setProperty("--lm-bg-content","#fefefe");
    root.setProperty("--lm-text","#4b6a9b");
    root.setProperty("--lm-text-alt","#2b3442");
    root.setProperty("--lm-shadow","rgba(70, 96, 187, 0.2)");
    root.setProperty("--lm-icon-bg","brightness(100%)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/moon-icon.svg";
    console.log("lightmode");
    darkmode = false;
    localStorage.setItem("dark-mode", darkmode);
}

function init(){
    darkmode = false;

    let value = localStorage.getItem("dark-mode");

    if(value == "true"){
        console.log("dark");
        darkModeProperties();
    }
    else{
        console.log("light");
        lightModeProperties();
    }
    getUserData(url + "RansomCodes");
}

init();