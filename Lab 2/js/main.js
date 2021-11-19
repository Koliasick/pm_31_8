let table;
$(document).ready(function() {
    table = $('#table').DataTable();
} );
function AddRow (data) {
    table.row.add( data ).draw( false );
} ;
