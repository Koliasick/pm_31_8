let model = new SpaceStationModel();
function Submit(){
    const form = document.getElementById("space-station-form");
    const formData = new FormData(form);
    const stationData = {}
    const row = [];
    formData.forEach((value, key) => {
        stationData[key] = value
        row.push(value)
    })
    if(!(model.Find((elem)=> elem["number"] == stationData["number"]) === undefined)) {
        model.Edit((elem)=> elem["number"] == stationData["number"],stationData)
        document.location.reload();
        return;
    }
    model.Create(stationData);
    AddRow(row);
    form.reset();
    return false;
}
document.addEventListener('table-created', () => {
    const data = model.Select();
    data.forEach((elem)=>{
        const row = [];
        row.push(elem["number"])
        row.push(elem["capacity"])
        row.push(elem["demand"])
        AddRow(row);
    })
})
document.getElementById("space-station-form").addEventListener('change',(e)=>{
    const formData = new FormData(document.getElementById("space-station-form"));
    const stationData = {}
    formData.forEach((value, key) => {
        stationData[key] = value
    })
    let del = document.getElementById("delete-button")
    let submit = document.getElementById("submit-button")
    if(!(model.Find((elem)=> elem["number"] == stationData["number"]) === undefined)) {
        del.classList.remove("disabled")
        del.classList.add("enabled")
        del.addEventListener('click',Delete)
        submit.value = "Edit";
    }
    else{
        del.classList.add("disabled")
        del.classList.remove("enabled")
        del.removeEventListener('click',Delete)
        submit.value = "Submit";
    }
})
function Delete(){
    model.Delete((elem)=>
        document.getElementById("unique").value == elem["number"]
    )
    document.location.reload();
}
