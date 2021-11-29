class BaseModel {
    constructor (collectionName) {
        this.collectionName = collectionName
        this.fields = ['id']
    }
    /**
     * @returns {Number}
     */
    getNextId (collection) {
        return collection.length + 1
    }
    /**
     * @returns {Object}
     */
    GetEmpty () {
        const entry = {}

        this.fields.forEach(element => {
            entry[element] = null
        })

        return entry
    }
    /**
     * @returns {Array}
     */
    Select () {
        const stored = localStorage.getItem(this.collectionName)
        const collection = stored ? JSON.parse(stored) : []

        return collection
    }
    Commit (collection) {
        localStorage.setItem(this.collectionName, JSON.stringify(collection))
    }
    /**
     * @param {Number} id
     * @returns {BaseModel|undefined}
     */
    FindById (id) {
        return this.Select().find(item => item.id === id)
    }
    /**
     * @param {Number} id
     * @returns {Number}
     */
    FindIndexById (id) {
        return this.Select().findIndex(item => item.id === id)
    }
    Create (row) {
        const collection = this.Select()
        const entry = this.GetEmpty()

        entry.id = this.getNextId(collection)
        for (const key in row) {
            if (entry.hasOwnProperty(key) &&
                entry.key !== 'id') {
                entry[key] = row[key]
            }
        }

        collection.push(entry)
        this.Commit(collection)
    }
    Find(/* function */callback){
        const collection = this.Select()
        return collection.find(callback)
    }
    Delete(/* function */callback){
        const collection = this.Select()
        const elem = this.Find(callback)
        if(elem == undefined) return;
        collection.splice(this.FindIndexById(elem["id"]),1)
        this.Commit(collection)
    }
    Edit(callback,row){
        const collection = this.Select()
        const elem = this.Find(callback)
        const obj = Object.entries(row)
        for(let key in obj){
            if(obj[key][1] == null || obj[key][1] == ""){
                row[obj[key][0]] = elem[obj[key][0]];
            }
        }
        row["id"] = elem["id"]
        collection.splice(this.FindIndexById(elem["id"]),1,row)
        this.Commit(collection)
    }
}
