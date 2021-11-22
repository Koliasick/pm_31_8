class SpaceStationModel extends BaseModel{
    constructor() {
        super("SpaceStation");
        this.fields = this.fields.concat(['number', 'capacity','demand']);
    }
}
