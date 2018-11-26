import React from 'react';
import { renderHorseIcon, renderHarnessIcon, renderGreyhoundIcon } from './icons.js';

export class NextToJump extends React.Component {

    constructor( props ) {

        super( props );

        this.raceTypes = [ 'all', 'thoroughbred', 'greyhounds', 'trots' ];
    }

    makeClassName() {

        if ( arguments[0] !== '' ) {

            return `${this.props.classNamePrefix}__${arguments[0]}`;
        }

        return this.props.classNamePrefix;
    }

    renderPickBar() {

        return  <div className={ this.makeClassName( 'pick-bar') }>
                {
                    this.raceTypes.map( type => {

                        let className = this.makeClassName( 'race-type' );
                        className = `${className} ${className}--active`;
                        
                        return  <span key={ type } 
                                      className={ className }
                                      onClick={ this.handleRaceTypeClick } 
                                >
                                    { type === "all" && "All" }
                                    { type === "trots" && renderHarnessIcon() }
                                    { type === "greyhounds" && renderGreyhoundIcon() }
                                    { type === "thoroughbred" && renderHorseIcon() }
                                </span>
                    } )
                }
                </div>
    }

    renderPickList() {

        return  <div className={ this.makeClassName( 'list' ) }>
                {
                    this.props.raceEvents.map( ( raceEvent, index ) => {

                        return this.renderPickItem( raceEvent, index )
                    } )
                }
                </div>

    }

    renderPickItem( item, key ) {

        let className = this.makeClassName( 'event' );
        let classNameOfIcon = this.makeClassName( 'event__icon' );
        let classNameOfEventName = this.makeClassName( 'event__name' );
        let classNameOfEventVenue = this.makeClassName( 'event__venue' );
        let classNameOfTimeLeft = this.makeClassName( 'event__time-left' );

        return  <div key={ key } className={ className }>
                    <div className={ classNameOfIcon }>
                        { item.EventType.EventTypeDesc === "Trots" && renderHarnessIcon() }
                        { item.EventType.EventTypeDesc === "Greyhounds" && renderGreyhoundIcon() }
                        { item.EventType.EventTypeDesc === "Thoroughbred" && renderHorseIcon() }
                    </div>
                    <div className={ classNameOfEventName }>{ item.EventName }</div>
                    <div className={ classNameOfEventVenue }>{ item.Venue.Venue }</div>
                    <div className={ classNameOfTimeLeft }>{ item.timeLeft }</div>
                </div>
    }

    render() {

        return  <div className={ this.makeClassName( 'main' ) } >
                    { this.renderPickBar() }
                    { this.renderPickList() }
                </div>
    }
}

NextToJump.defaultProps = {

    raceEvents: [],
    classNamePrefix: 'next-to-jump'
};
