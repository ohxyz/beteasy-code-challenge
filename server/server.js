const express = require( 'express' );
const faker = require( 'faker' );
const APP = express();
const PORT = 5001;

function allowCors( request, response, next ) {
    
    response.set( 'Access-Control-Allow-Origin', '*' );
    next();
}

function setHeaders( request, response, next ) {

    response.set( 'Content-Type', 'application/json; charset=utf-8' );
    next();
}

APP.use( express.static( 'src' ) );
APP.use( express.static( 'public' ) );
APP.use( allowCors );
APP.use( setHeaders );

APP.use( ( request, response, next ) => {

    next();
} )

APP.get( '/next-to-jump', ( request, response ) => {

    let raceEvents = { result: [] };
    let raceTypes = [ 'Thoroughbred', 'Greyhounds', 'Trots' ];

    for ( let i = 0; i < 10; i ++ ) {

        let raceEvent = {

            EventName: faker.address.streetName(),
            Venue: { Venue: faker.address.city() },
            EventTypeDesc: raceTypes[ Math.floor( Math.random() * raceTypes.length ) ],
            AdvertisedStartTime: faker.date.between( '2018-12-01', '2018-12-31' )
        }

        raceEvents.result.push( raceEvent );
    }

    response.status( 200 );
    response.send( raceEvents );

} );

APP.get( '/debug', ( request, response ) => { 

    response.status( 200 );
    response.send( '"Debug"' );
} );

APP.get( '/400', ( request, response ) => { 

    response.status( 400 );
    response.send( '400' );
} );

APP.get( '/text', ( request, response ) => { 

    let content = 'Hello World!';

    response.send( content );

} );

APP.get( '/json', ( request, response ) => { 

    let o = { a: 1, b: null, c: undefined, d: false };
    response.send( o );

} );

APP.listen( PORT, () => {

    console.log( `Server started, listening at port: ${PORT}` );
} );