let model = new PlanetModel();
function Submit(){
    const form = document.getElementById("planet-form");
    const formData = new FormData(form);
    const stationData = {}
    const row = [];
    formData.forEach((value, key) => {
        stationData[key] = value
        row.push(value)
    })
    if(!(model.Find((elem)=> elem["name"] == stationData["name"]) === undefined)) {
        model.Edit((elem)=> elem["name"] == stationData["name"],stationData)
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
        row.push(elem["name"])
        row.push(elem["capacity"])
        row.push(elem["mass"])
        AddRow(row);
    })
})
document.getElementById("planet-form").addEventListener('change',(e)=>{
    const formData = new FormData(document.getElementById("planet-form"));
    const stationData = {}
    formData.forEach((value, key) => {
        stationData[key] = value
    })
    let del = document.getElementById("delete-button")
    let submit = document.getElementById("submit-button")
    if(!(model.Find((elem)=> elem["name"] == stationData["name"]) === undefined)) {
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
        document.getElementById("unique").value == elem["name"]
    )
    document.location.reload();
}
