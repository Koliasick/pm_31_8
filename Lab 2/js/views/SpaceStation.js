let model = new SpaceStationModel();
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
    data.forEach((element)=>{
        const row = [];
        row.push(element["number"])
        row.push("<input type='text' name='capacity' data-identifier='"+element["number"]+"' value='" + element["capacity"] + "'class='table-column-input' >")
        row.push("<input type='text' name='demand' data-identifier='"+element["number"]+"' value='" + element["demand"] + "'class='table-column-input' >")
        AddRow(row,"<div class='actions-wrapper'> <button class='button px-1 mx-1' onclick='Delete("+element["number"]+")'>Delete</button> </div>");
    })
    $('[data-bs-toggle="popover"]').popover({
        container: 'body',
        html: true,
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


