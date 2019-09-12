import React from 'react';

class MySvg extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            icon: this.props.icon ? this.props.icon : '',
            className: this.props.className ? this.props.className : '',
            style: this.props.style ? this.props.style : {},
        })
    }

    render() {
        return (
            <svg className={`icon  ${this.state.className}`} style={this.state.style}  aria-hidden="true">
                <use xlinkHref={'#' + this.state.icon}></use>
            </svg>
        );
    }
}

export default MySvg;