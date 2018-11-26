/**
 * Get count down literals between two dates
 */ 
function countDown( startDate, endDate ) {

    let startTime = startDate.getTime();
    let endTime = endDate.getTime();
    let distance = endTime - startTime;

    let days = Math.floor( distance / ( 1000 * 60 * 60 * 24 ) );
    let hours = Math.floor( ( distance % ( 1000 * 60 * 60 * 24 ) ) / (1000 * 60 * 60) );
    let minutes = Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / (1000 * 60) );
    let seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 );

    return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

function cloneByJSON( object ) {

    return JSON.parse( JSON.stringify( object ) );
}

export {

    countDown,
    cloneByJSON
}