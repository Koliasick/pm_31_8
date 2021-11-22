class PlanetModel extends BaseModel{
    constructor() {
        super("Planet");
        this.fields = this.fields.concat(['name', 'capacity','mass']);
    }
}
