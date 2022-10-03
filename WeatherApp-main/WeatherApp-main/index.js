const city = document.getElementById('city');
const container = document.getElementById("body");
const apiKey = "80b778eabf2279d662de9b9ab44cee60";
var htmlOnError,htmlP;
city.addEventListener('keypress',function(e){
    if (e.key === 'Enter') {
        getWeatherData(city.value);
    }
});
getWeatherData("Tirupati");

function getWeatherData(city){
    /*Api in openweather map,`` is used to insert variables*/
    const locApi =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(locApi);
    fetch(locApi)
        .then(response =>{  /*reponse object from api*/
            console.log(response);
            if(!response.ok){
                htmlOnError = "<h1>"+response.status+"</h1>";
                throw new Error(response.statusText);
            }
            loadContainerHtml();
           
            return response.json();/*returning json of the response object*/
        }
    )
    .then(data=>{
        console.log(data);
        // console.log("hi");
        updatePage(data);
    })
    .catch(error=>{ 
            console.log(error.message);
            htmlOnError=htmlOnError+"<h2>"+error.message+"</h2>";
            container.innerHTML= htmlOnError;
        }
            );
}
function loadContainerHtml(){
      htmlP= `<div id=\"body\"> 
        <p id=\"city_name\">
        city name
        </p>
        <p id=\"date\"> date </p>
        <br>
        <br>
        <p id=\"temp\">
            28 °C
        </p>
        <p id=\"desc\">
            Description
        </p>
        <p id=\"minmax\">
            min/max
        </p>
       </div> `;
       container.innerHTML= htmlP;

}

function updatePage(data){
    const cityname = document.getElementById("city_name");
    const temp = document.getElementById("temp");
    const desc = document.getElementById("desc");
    const minmax = document.getElementById("minmax");
    const date=document.getElementById("date");
    /*Convert country code to Country Name*/
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );

    cityname.innerText=data.name +","+regionNames.of(data.sys.country);
    temp.innerText=data.main.temp+ '°C';
    var descStr = String(data.weather[0].description);
    desc.innerText= descStr.charAt(0).toUpperCase()+descStr.slice(1);// Ensuring First letter is always Capital
    minmax.innerText = data.main.temp_max+'°C/'+data.main.temp_min+'°C';
    const today = new Date(Date.now());
    date.innerText= today.toDateString();


}

