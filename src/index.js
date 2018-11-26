import React from 'react';
import ReactDOM from 'react-dom';
import { NextToJump } from './next-to-jump.js';
import { countDown, cloneByJSON, makeClassName } from './util.js';
import { renderLogo, renderHorseIcon, renderHarnessIcon, renderGreyhoundIcon } from './icons.js';

require( '../less/styles.less' );

class App extends React.Component {

    constructor( props ) {

        super( props );

        this.promiseGetRaceEvents = this.promiseGetRaceEvents.bind( this );
        this.requestThenUpdate = this.requestThenUpdate.bind( this );

        this.localUpdateTimer = -1;
        this.selectedRaceType = '';
        this.allRaceEvents = [];

        this.state = {
            raceEvents: [],
            errorMessage: ''
        };

        setInterval( this.requestThenUpdate, 5000 );
    }

    requestThenUpdate() {

        this.promiseGetRaceEvents()
            .then( raceEvents => { 

                this.allRaceEvents = raceEvents;
                this.updateRaceEvents( raceEvents, this.selectedRaceType );

                this.localUpdateTimer = setInterval(

                    () => this.updateRaceEvents( raceEvents, this.selectedRaceType ),
                    1000
                );
            } )
            .catch( error => {

                this.setState( { 

                    errorMessage: error.message
                } );
            } );
    }

    promiseGetRaceEvents() {

        let url = 'https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump';

        return fetch( url, { mode: 'cors', cache: 'no-store' } )
                .then( response => {

                    if ( response.status !== 200 ) {

                        throw new Error( 'Failed to get racing events.' );
                    }

                    try {

                        return response.json();
                    }
                    catch ( error ) {

                        throw new Error( 'Reponse is not in JSON format.' );
                    }
                    
                } )
                .then( json => {

                    let raceEvents = json.result;

                    if ( Array.isArray( raceEvents ) === false ) {

                        throw new Error( 'Error in data.' );
                    }

                    return raceEvents;
                } )
                .catch( error => {

                    throw new Error( error.message );
                } );
    }

    filterRaceEvents( raceEvents, type ) {

        return  raceEvents.filter( raceEvent => {

                    if ( type !== undefined
                            && type !== ''
                            && type !== 'All' 
                            && raceEvent.EventTypeDesc !== type ) {

                        return false;
                    }

                    raceEvent.timeLeft = countDown( 
                        new Date(),
                        new Date( raceEvent.AdvertisedStartTime )
                    );

                    return true;

                } )
    }

    updateRaceEvents( raceEvents, type ) {

        let filteredRaceEvents = this.filterRaceEvents( raceEvents, type );

        this.setState( { 

            raceEvents: filteredRaceEvents
        } )
    }

    componentDidMount() {

        this.requestThenUpdate();
    }

    selectRaceType( type ) {

        this.selectedRaceType = type;
        let filteredRaceEvents = this.filterRaceEvents( this.allRaceEvents, this.selectedRaceType );

        this.setState( { 

            raceEvents: filteredRaceEvents
        } )
    }

    renderPickBar() {

        let raceTypes = [ 'All', 'Thoroughbred', 'Greyhounds', 'Trots' ];

        return  <div className="next-to-jump__pick-bar">
                {
                    raceTypes.map( type => {

                        let className = 'next-to-jump__race-type';

                        if ( type === this.selectedRaceType ) {

                            className = `${className} ${className}--active`;
                        }

                        return  <span key={ type } 
                                      className={ className }
                                      onClick={ () => this.selectRaceType( type ) } 
                                >
                                    { type === "All" && "All" }
                                    { type === "Trots" && renderHarnessIcon() }
                                    { type === "Greyhounds" && renderGreyhoundIcon() }
                                    { type === "Thoroughbred" && renderHorseIcon() }
                                </span>
                    } )
                }
                </div>
    }

    render() {

        return  <div className="app">
                    { 
                        this.state.errorMessage !== ''
                            && <div className="error">{ this.state.errorMessage }</div> 
                    }
                    <div className="main">
                        <div className="next-to-jump">
                            <div className="next-to-jump__header">Next to Jump</div>
                            <div className="next-to-jump__content">
                                <div className="next-to-jump__pick-bar">
                                    { this.renderPickBar() }
                                </div>
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
