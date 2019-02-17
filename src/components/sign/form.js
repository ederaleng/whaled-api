import React, { Component } from 'react';
import {  Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux'
import { PrivateKey,Client } from 'dsteem'
//comsponents
import Susses from './susses'
import ErrorOperation from './error'

//actions
import { updateFinish, updateData, updateKey, updateButtomSingin } from './../../actions'

const client = new Client('https://wls.kennybll.com');

class FormOperation extends Component {
    async executeOperation(){
        try {
            this.props.updateButtom(true)
            var op=[ this.props.operationCurrent ,this.props.data ];
            var key=PrivateKey.fromString(this.props.keyAccount)
            const opsTrx = await client.broadcast.sendOperations([op],key)
            this.props.updateFinish({ susses:true,msg:null,trxid:opsTrx.id })
        } catch (err) {
            this.props.updateFinish({ susses:false,msg:err.message,trxid:null })
        }
    }
    accountUpdate(e){
        var ojbMod=this.props.data
        ojbMod.account=e.target.value
        this.props.updateData(ojbMod)
    }
    keyUpdate(e){
        this.props.updateKey(e.target.value)
    }
    render() {
        if(this.props.finish.susses===true){
            return (
                <Susses trxid={this.props.finish.trxid} />
            )
        }
        if(this.props.finish.susses===false){
            return (
                <ErrorOperation message={this.props.finish.msg} />
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
                <Button type="primary" loading={this.props.ButtomSingin} className="buttoms_Forms" size="large" onClick={ this.executeOperation.bind(this) }>
                    sing in
                </Button>   
            </div>
        );
    }
}

const mapDispatchToProps  = dispatch => ({
    updateButtom: value => { dispatch(updateButtomSingin(value)) },
    updateLoading: value => { dispatch(updateFinish(value)) },
    updateData: value => { dispatch(updateData(value)) },
    updateKey: value => { dispatch(updateKey(value)) },
    updateFinish: value => { dispatch(updateFinish(value)) },
})

const stateProsp  = state =>({ 
    operationCurrent: state.operation,
    keyAccount:state.key,
    finish:state.finish,
    data: state.data,
    ButtomSingin: state.ButtomSingin
})

export default connect( stateProsp,mapDispatchToProps )(FormOperation);