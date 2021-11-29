let cargoModel = new CargoModel();
let stationModel = new SpaceStationModel();
let planetModel = new PlanetModel() ;
let planetStation = new PlanetStation();
let cargoStation = new CargoStation();
let cargoPlanet = new CargoPlanet();
let cargo = cargoModel.Select();
let planets = planetModel.Select();
let stations = stationModel.Select();
let sender;
window.onload = () =>{
    let cargoOptions = "<option selected disabled hidden value=\"\"> Choose cargo </option>";
    for(let c in cargo){
        cargoOptions+= "<option value='"+cargo[c]["code"]+"'>" +cargo[c]["name"] + "</option>";
    }
    let receiverOptions = "<option selected disabled hidden value=\"\"> Choose receiver object </option>";
    for(let s in stations){
        if(stations[s]["capacity"] > cargoStation.GetNumberOfCargo(stations[s]["number"])) receiverOptions+= "<option value='"+stations[s]["number"]+"'>" +stations[s]["number"] + "</option>";
    }
    for(let p in planets){
        if(planets[p]["capacity"] > cargoPlanet.GetNumberOfCargo(planets[p]["name"]))receiverOptions+= "<option value='"+planets[p]["name"]+"'>" +planets[p]["name"] + "</option>";
    }
    $(".cargo-selector").html(cargoOptions);
    $(".receiver-selector").html(receiverOptions);
    $("form").on('change',(e)=>{
        if(e.target.classList.contains("cargo-selector")){
            if($(e.currentTarget).find(".receiver-selector option[selected]").val()=="") {
                let options = "<option selected disabled hidden value=\"\"> Choose receiver object </option>";
                sender = cargoPlanet.Find((elem) => elem["cargo"]["code"] == e.target.value)
                if (sender == undefined) {
                    sender = cargoStation.Find((elem) => elem["cargo"]["code"] == e.target.value)
                    if(sender != undefined){
                        for (let s in stations) {
                            if (stations[s]["number"] != sender["station"]["number"]) options += "<option value='" + stations[s]["number"] + "'>" + stations[s]["number"] + "</option>";
                        }
                        for (let p in planets) {
                            options += "<option value='" + planets[p]["name"] + "'>" + planets[p]["name"] + "</option>";
                        }
                        $(".receiver-selector").html(options);
                    }
                } else {
                    for (let p in planets) {
                        if (planets[p]["name"] != sender["planet"]["name"]) options += "<option value='" + planets[p]["name"] + "'>" + planets[p]["name"] + "</option>";
                    }
                    for (let s in stations) {
                        options += "<option value='" + stations[s]["number"] + "'>" + stations[s]["number"] + "</option>";
                    }
                    $(".receiver-selector").html(options);
                }
            }
            sender = cargoPlanet.Find((elem) => elem["cargo"]["code"] == e.target.value)
            if (sender == undefined) {
                sender = cargoStation.Find((elem) => elem["cargo"]["code"] == e.target.value)
            }
        }
        else{
            if($(e.currentTarget).find(".cargo-selector option[selected]").val()==""){
                let options = "<option selected disabled hidden value=\"\"> Choose cargo </option>";
                let searchResult = planets.Find((elem) => elem["name"] == e.target.value)
                if(searchResult == undefined){}
                else{
                    
                }
            }
        }
    });
}
