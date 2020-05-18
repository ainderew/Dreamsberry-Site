let arrayHolder = [];
const dataList = document.querySelector(".data-list");
const dataContainer = document.querySelector(".dataContainer");


const getData = async () =>{
    const response = await fetch("http://localhost:3000/reserve",{
        method: "GET",
        mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
         arrayHolder = data;
    })
    console.log(arrayHolder)
    dataDisplay()
}

console.log(arrayHolder)

const dataDisplay = () =>{
    arrayHolder.forEach((el,index)=>{
        let li = document.createElement("li");
        if (index%2 === 0){
            li.style.background = "#F5F7F7";
        }
        li.className = "entry";
        li.innerHTML = 
        `<div class="checkbox-col col"> <input class="checkbox" type="checkbox"> </div>
        <div class="name-col col"><h1>${el.name}</h1></div>
        <div class="email-col col"><h1>${el.email}</h1></div>
        <div class="phone-col col"><h1>${el.phoneNumber}</h1></div>
        <div class="date-col col"><h1>Date Reserved</h1></div>`
        dataList.appendChild(li);
    })
    
}
getData();