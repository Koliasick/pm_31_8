class CargoModel extends BaseModel{
    constructor() {
        super("Cargo");
        this.fields = this.fields.concat(['code', 'name','mass']);
    }
}
