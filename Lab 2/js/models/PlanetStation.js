class PlanetStation extends BaseModel{
    constructor() {
        super("PlanetStation");
        this.fields = this.fields.concat(['planet', 'station']);
    }
}
