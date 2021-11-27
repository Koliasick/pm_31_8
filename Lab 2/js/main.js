let table;
let event = new Event('table-created')
$(document).ready(function() {
    table = $('#table').DataTable();
    document.dispatchEvent(event);
} );
function AddRow (/* array */data,actions) {
    if(actions != undefined) {
        data.push(actions);
    }
    table.row.add( data ).draw();
} ;
