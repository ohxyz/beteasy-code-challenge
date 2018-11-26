import React from 'react';
import ReactDOM from 'react-dom';
import { NextToJump } from './next-to-jump.js';
import { countDown, cloneByJSON } from './util.js';
import { renderLogo } from './icons.js';

require( '../less/styles.less' );

class App extends React.Component {

    constructor( props ) {

        super( props );

        this.promiseGetRaceEvents = this.promiseGetRaceEvents.bind( this );
        this.isLocalUpdateTimerStarted = false;

        this.state = {
            raceEvents: []
        };

        setInterval( this.promiseGetRaceEvents, 10000 );
    }

    promiseGetRaceEvents() {

        let url = 'https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump';

        return fetch( url, { mode: 'cors' } )
                .then( response => {
                    
                    return response.json();
                } )
                .then( json => {

                    let raceEvents = json.result;

                    this.updateRaceEvents( raceEvents );

                    return raceEvents;
                } );
    }

    updateRaceEvents( events ) {

        let raceEvents = cloneByJSON( events );

        raceEvents.forEach( raceEvent => { 

            raceEvent.timeLeft = countDown( 
                new Date(),
                new Date( raceEvent.AdvertisedStartTime )
            );
        } )

        this.setState( { 

            raceEvents: raceEvents
        } )
    }

    componentDidMount() {

        this.promiseGetRaceEvents()
            .then( raceEvents => { 

                if ( this.isLocalUpdateTimerStarted === false ) {

                    setInterval( () => this.updateRaceEvents( raceEvents ), 1000 )
                    this.isLocalUpdateTimerStarted = true;
                }
            } );
    }

    render() {

        return  <div className="app">
                    <div className="main">
                        <div className="next-to-jump">
                            <div className="next-to-jump__header">Next to Jump</div>
                            <div className="next-to-jump__content">
                                <NextToJump raceEvents={ this.state.raceEvents } />
                            </div>
                        </div>
                    </div>
                </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById( 'container' )
);
