class CargoStation extends BaseModel{
    constructor() {
        super("cargoStation");
        this.fields = this.fields.concat(['cargo', 'station']);
    }
    GetNumberOfCargo(stationNumber){
        let data = this.Select();
        let counter = 0;
        data.forEach((elem)=>{
            if(elem["station"]["number"]==stationNumber) counter++;
        });
        return counter;
    }
}
