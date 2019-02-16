import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Card, Avatar, Row, Col } from 'antd'
//actions
import { updateConfirmOperation } from '../actions'

class PreOperacion extends Component {
    updateConfirm(){
        this.props.updateConfirmOperation(true);
    }
    Ops(data,typeOp){
        switch (typeOp) {
            case "transfer":
                return(
                    <div className="box_Op">
                        <Row type="flex" justify="space-between" align="center">
                            <Col span={8}><Avatar size={64} src={`https://imgp.whaleshares.io/profileimage/${data.from}/`} /></Col>
                            <Col span={8}><img alt="arrow send amount" style={{ height:64,width:64 }} src="/assets/arrow.svg" /></Col>
                            <Col span={8}><Avatar size={64} src={`https://imgp.whaleshares.io/profileimage/${data.to}/`} /></Col>
                        </Row>
                        <h2 style={{ marginTop:10 }}>{data.amount}</h2>
                        <strong style={{ marginTop:10 }}>{data.memo ? data.memo : null}</strong>
                    </div>
                )
            case "account_witness_vote":
                return(
                    <div className="box_Op" style={{ textAlign:"start" }}>
                        <strong style={{ marginTop:10 }}>Witness:{` ${data.witness}`}</strong>
                        <br />
                        <strong style={{ marginTop:10 }}>Approve:{` ${data.approve}`}</strong>
                    </div>
                )
            case "account_witness_proxy":
                return(
                    <div className="box_Op" style={{ textAlign:"start" }}>
                        <strong style={{ marginTop:10 }}>Account:{` ${data.account}`}</strong>
                        <br />
                        <strong style={{ marginTop:10 }}>Proxy:{` ${data.proxy}`}</strong>
                    </div>
                )
            default:
                    return(
                        <div>
                            operacion desconocida
                        </div>
                    )
        }
    }
    render() {
        return (
            <div>
                <div className="confirm_Operation">
                    <Card
                    title={ `${ this.props.operation.toUpperCase() }` }
                    style={{ width: "100%",border:"none",backgroundColor:"#7f90a4",borderRadius:"10px",marginBottom:-1 }}
                    bodyStyle={{ backgroundColor:"#fff",border:"solid 1px #7f90a4",borderRadius:"0px 0px 10px 10px" }}
                    headStyle={{ backgroundColor:"#7f90a4",borderRadius:"10px 10px 0px 0px" }}
                    >
                    { this.Ops(this.props.Data,this.props.operation) }
                    </Card>
                </div>
                <Button type="primary" className="buttoms_Forms" size="large" onClick={ this.updateConfirm.bind(this) }>confirm</Button>
            </div>
        );
    }
}

const mapDispatchToProps  = dispatch => ({
    updateConfirmOperation: value =>{ dispatch(updateConfirmOperation(value)) }
})

const stateProsp  = state =>({ 
    operation: state.operation,
    Data: state.data
})

export default connect( stateProsp,mapDispatchToProps )(PreOperacion);