import React, { Component } from 'react';

class ErrorOperation extends Component {
    render() {
        return (
            <div>
                 <img style={{ height:"100%",width:"30%" }} alt="err imagen" src="/assets/error.svg" />
                <div style={{ marginTop:10 }}>
                    <div style={{ borderBottom:"solid 1px black",margin:"0px 10% 6px" }}>
                        <h2>Error</h2>
                        <h3>Validation errors in your request!</h3>
                    </div>
                    <strong>{this.props.message}</strong>
                </div>
            </div>
        );
    }
}

export default ErrorOperation;