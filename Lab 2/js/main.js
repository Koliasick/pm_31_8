let table;
let event = new Event('table-created')
$(document).ready(function() {
    table = $('#table').DataTable();
    document.dispatchEvent(event);
} );
function AddRow (/* array */data) {
    table.row.add( data ).draw( false );
} ;
