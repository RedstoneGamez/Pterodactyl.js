const Pterodactyl = require( 'pterodactyl.js' );

const client = new Pterodactyl.Builder()
    .setURL( 'https://pterodactyl.app/' )
    .setAPIKey( 'API Key' )
    .asAdmin();

let isAccountCredentials = ( username, email ) => {
    return new Promise( ( resolve, reject ) => {
        try {
            let users = await client.getUsers();
            let user = users.filter( user => user.username === username );

            if ( !user ) return resolve( { correct: false, } );

            if ( user.email ) {
                resolve( { correct: true, user, } );
            } else {
                resolve( { correct: false, } );
            }
        } catch ( error ) {
            reject( error );
        }
    } );
};

isAccountCredentials( 'demo', 'demo@pterodactyl.io' ).then( account => {
    if ( account.correct ) {
        console.log( 'Correct! The username and email provided are valid.' );
    } else {
        console.log( 'Incorrect! The username and email provided are invalid.' );
    }
} ).catch( error => console.log( error ) );
