import React, { Component } from 'react';

class ErrorOperation extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                err {this.props.message}
            </div>
        );
    }
}

export default ErrorOperation;