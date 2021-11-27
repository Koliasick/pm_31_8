class CargoStation extends BaseModel{
    constructor() {
        super("PlanetStation");
        this.fields = this.fields.concat(['cargo', 'station']);
    }
}
