class CargoPlanet extends BaseModel{
    constructor() {
        super("cargoPlanet");
        this.fields = this.fields.concat(['cargo', 'planet']);
    }
    GetNumberOfCargo(planetName){
        let data = this.Select();
        let counter = 0;
        data.forEach((elem)=>{
            if(elem["planet"]["name"]==planetName) counter++;
        });
        return counter;
    }
}
