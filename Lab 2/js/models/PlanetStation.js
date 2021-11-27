class PlanetStation extends BaseModel{
    constructor() {
        super("PlanetStation");
        this.fields = this.fields.concat(['planet', 'station']);
    }
    FindPlanetByStation(stationNumber){
        let planetstation = this.Find((elem)=>elem["station"]["number"]==stationNumber);
        if (planetstation == undefined) return;
        return planetstation["planet"];
    }
}
