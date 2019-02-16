import React, { Component } from 'react';
import {  Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux'
import { PrivateKey,Client } from 'dsteem'
//comsponents
import Susses from './susses'
import ErrorOperation from './error'

//actions
import { updateFinish,updateData } from './../actions'

const client = new Client('https://api.steemit.com');

class FormOperation extends Component {
    async executeOperation(){
        try {
            var op=[ this.state.operation ,this.state.data ];
            var key=PrivateKey.fromString("5KhoTE2GKFPyE5zs7PKmEGbrVQ51K5SWCp1RK4wjyscMq7ZwkMt")
            console.log(op)
            ///const witnessdata = await client.broadcast.sendOperations([op],key)
            //console.log(witnessdata)
        } catch (err) {
            console.log(err.message)
        }
    }
    accountUpdate(e){
        var ojbMod=this.props.data
        ojbMod.account=e.target.value
        this.props.updateData(ojbMod)
    }
    keyUpdate(e){
        console.log(e.target.value)
    }
    render() {
        if(this.props.finish.susses===true){
            return (
                <Susses />
            )
        }
        if(this.props.finish.susses===false){
            return (
                <ErrorOperation />
            )
        }
        return (
            <div>
                <div className="sing_in">
                    <Form className="login-form">
                        <Form.Item>
                            <Input onChange={this.accountUpdate.bind(this)} size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item>
                            <Input onChange={this.keyUpdate.bind(this)} size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" autoComplete="true" placeholder="Password" />
                        </Form.Item>
                    </Form>        
                </div>
                <Button type="primary" className="buttoms_Forms" size="large" onClick={ this.executeOperation }>
                    sing in
                </Button>   
            </div>
        );
    }
}

const mapDispatchToProps  = dispatch => ({
    updateLoading: value => { dispatch(updateFinish(value)) },
    updateData: value => { dispatch(updateData(value)) },
})

const stateProsp  = state =>({ 
    operationCurrent: state.operation,
    keyAccount:state.key,
    finish:state.finish,
    data: state.data
})

export default connect( stateProsp,mapDispatchToProps )(FormOperation);