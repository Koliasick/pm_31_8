let model = new SpaceStationModel();
let planetModel = new PlanetModel();
let planetStation = new PlanetStation();
function Submit(){
    const form = document.getElementById("space-station-form");
    const formData = new FormData(form);
    const stationData = {}
    formData.forEach((value, key) => {
        stationData[key] = value
    })
    if(!(model.Find((elem)=> elem["number"] == stationData["number"]) === undefined)) {
        alert("Error such entry already exists");
        return false;
    }
    model.Create(stationData);
    return true;
}
document.addEventListener('table-created', () => {
    const data = model.Select();
    const planetList = planetModel.Select();
    data.forEach((element)=>{
        let htmlPlanetList = "<ul>"
        planetList.forEach((planet)=>{
            if(planet.name != planetStation.FindPlanetByStation(element["number"])) htmlPlanetList += "<li onclick='ChoosePlanet("+element["number"]+", &quot;"+planet["name"]+"&quot; )'><h6>"+planet["name"]+"</h6></li>"
        });
        htmlPlanetList += "</ul>";
        const row = [];
        row.push(element["number"])
        row.push("<input type='text' name='capacity' data-identifier='"+element["number"]+"' value='" + element["capacity"] + "' class='table-column-input' >")
        row.push("<input type='text' name='demand' data-identifier='"+element["number"]+"' value='" + element["demand"] + "' class='table-column-input' >")
        AddRow(row,"<div class='actions-wrapper'> <button class='button px-1 mx-1' onclick='Delete("+element["number"]+")'>Delete</button> <button class='button px-1 mx-1' data-bs-toggle='popover' title='Select Planet' data-bs-content=\""+htmlPlanetList+"\">" + (planetStation.FindPlanetByStation(element["number"])==undefined?"No planet":planetStation.FindPlanetByStation(element["number"])["name"] )+" </button> </div>");
    })
    $('[data-bs-toggle="popover"]').popover({
        container: 'body',
        html: true,
        sanitize: false,
        content: function () {
            return  $(this).data('bs-content');
        }
    }).click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $(".table-column-input").on('change',(e)=>{
        let data = model.GetEmpty();
        let identifier = e.currentTarget.dataset.identifier;
        let dataName = e.currentTarget.getAttribute("name");
        data[dataName] = e.currentTarget.value;
        Edit(identifier,data);
    })
})
function Delete(number){
    model.Delete((elem)=>
        number == elem["number"]
    )
    document.location.reload();
}
function Edit(number,data){
    model.Edit((elem)=> elem["number"] == number,data);
}
function ChoosePlanet(stationNumber,planetName){
    let row = {};
    row["planet"] = planetModel.Find((planet)=>planet["name"]==planetName);
    row["station"] = model.Find((station)=>station["number"]==stationNumber);
    planetStation.Delete((el)=>el["station"]["number"]==stationNumber);
    planetStation.Create(row);
    document.location.reload();
}

