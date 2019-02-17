import React, { Component } from 'react';

class Susses extends Component {
    render() {
        return (
            <div>
                <img style={{ height:"100%",width:"30%" }} alt="err imagen" src="/assets/succes.svg" />
                <div style={{ marginTop:10 }}>
                    <h2>Congratulations</h2>
                    <h3>The operation has been successfully broadcasted.</h3>
                    <h3><strong>ID:<a href={ `https://whaled.xyz/trx/${this.props.trxid}` }>{` ${this.props.trxid}`}</a></strong></h3>
                </div>
            </div>
        );
    }
}

export default Susses;