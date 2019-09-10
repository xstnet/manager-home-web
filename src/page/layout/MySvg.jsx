import React from 'react';

class MySvg extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            icon: this.props.icon ? this.props.icon : '',
            style: this.props.style ? this.props.style : {},
        })
    }

    render() {
        return (<div>
            <svg className="icon" style={this.state.style}  aria-hidden="true">
                <use xlinkHref={'#' + this.state.icon}></use>
            </svg>
        </div>);
    }
}

export default MySvg;