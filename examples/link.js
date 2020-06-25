const Pterodactyl = require( 'pterodactyl.js' );

const client = new Pterodactyl.Builder()
    .setURL( 'https://pterodactyl.app/' )
    .setAPIKey( 'API Key' )
    .asAdmin();

let isAccountCredentials = ( username, email ) => {
    return new Promise( ( resolve, reject ) => {
        client.getUsers()
            .then( async users => {
                let user = users.filter( user => user.username === username );

                if ( user ) {
                    let info = await user.getInfo();

                    if ( info.email === email ) {
                        resolve( { correct: true, user } );
                    } else {
                        resolve( { correct: false } );
                    }
                } else {

                }
            } ).catch( error => reject( error ) );
    } );
};

isAccountCredentials( 'demo', 'demo@pterodactyl.io' ).then( account => {
    if ( account.correct ) {
        console.log( 'Correct! The username and email provided are valid.' );
    } else {
        console.log( 'Incorrect! The username and email provided are invalid.' );
    }
} ).catch( error => console.log( error ) );
