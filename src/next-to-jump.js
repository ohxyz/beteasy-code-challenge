import React from 'react';
import { renderHorseIcon, renderHarnessIcon, renderGreyhoundIcon } from './icons.js';

export class NextToJump extends React.Component {

    constructor( props ) {

        super( props );
    }

    makeClassName() {

        if ( arguments[0] !== '' ) {

            return `${this.props.classNamePrefix}__${arguments[0]}`;
        }

        return this.props.classNamePrefix;
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
                    { this.renderPickList() }
                </div>
    }
}

NextToJump.defaultProps = {

    raceEvents: [],
    classNamePrefix: 'next-to-jump'
};
