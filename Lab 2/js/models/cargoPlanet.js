class CargoPlanet extends BaseModel{
    constructor() {
        super("PlanetStation");
        this.fields = this.fields.concat(['cargo', 'planet']);
    }
}
