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
                    else{
                        for (let s in stations) {
                            options += "<option value='" + stations[s]["number"] + "'>" + stations[s]["number"] + "</option>";
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
            else{
                sender = cargoPlanet.Find((elem) => elem["cargo"]["code"] == e.target.value);
                if (sender == undefined) {
                    sender = cargoStation.Find((elem) => elem["cargo"]["code"] == e.target.value);
                }
            }
        }
        else{
            if($(e.currentTarget).find(".cargo-selector option[selected]").val()==""){
                let options = "<option selected disabled hidden value=\"\"> Choose cargo </option>";
                let searchResult = planetModel.Find((elem) => elem["name"] == e.target.value);
                let ownCargoInfo;
                if(searchResult == undefined){
                    ownCargoInfo = cargoStation.Select().filter((elem)=>elem["station"]["number"] == e.target.value);
                }
                else{
                    ownCargoInfo = cargoPlanet.Select().filter((elem)=>elem["planet"]["name"] == e.target.value);
                }
                let ownCargo = [];
                ownCargoInfo.forEach((element)=>{
                    ownCargo.push(element["cargo"]["code"]);
                });
                cargo.forEach((elem)=>{
                    if(!ownCargo.includes(elem["code"]))options+= "<option value='" + elem["code"] + "'>" + elem["name"] + "</option>";
                });
                $(".cargo-selector").html(options);
            }
        }
    });
}
function MakeDelivery(){
    let receiver = $(".receiver-selector").val();
    let cargo = $(".cargo-selector").val();
    if(receiver == undefined || cargo == undefined) {
        alert("Fill inputs");
        return false;
    }
    if(sender != undefined){
        if(sender.hasOwnProperty("planet")){
            cargoPlanet.Delete((elem)=>elem["cargo"]["code"] == sender["cargo"]["code"]);
        }
        else{
            cargoStation.Delete((elem)=>elem["cargo"]["code"] == sender["cargo"]["code"]);
        }
    }
    let searchResult = planetModel.Find((elem)=>elem["name"]==receiver)
    if(searchResult == undefined){
        searchResult = stationModel.Find((elem)=>elem["number"]==receiver)
        cargoStation.Create({ cargo:cargoModel.Find((elem)=>elem["code"]=cargo),station:searchResult});
    }
    else{
        cargoPlanet.Create({ cargo:cargoModel.Find((elem)=>elem["code"]=cargo),planet:searchResult});
    }
    return true;
}
document.addEventListener('table-created', () => {
    stations.forEach((element)=>{
        if(cargoStation.GetNumberOfCargo(element["number"])<(element["demand"]/10*3)){
            const row = [];
            row.push(element["number"])
            row.push(element["capacity"])
            row.push(element["demand"])
            AddRow(row);
        }
    })
})
