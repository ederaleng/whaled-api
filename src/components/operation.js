import React, { Component } from 'react';
import path from 'path';
import queryString  from 'query-string';
import { Client } from 'dsteem'
import { connect } from 'react-redux'
//hellpers
import existAccount from './../helpers/accountExist'
import { updateLoading,updateSusses,updateOperation,updateData,updateMsg } from './../actions'

//compoent
import PreOperacion from './preOperacion'
import FormOperation from './form'
import ErrorOperation from './error'

const client = new Client('https://api.steemit.com');

class Operation extends Component {
    componentDidMount() {
        var location=this.props.location;
        var type_op=path.basename(location.pathname);
        var data=queryString.parse(location.search)
        switch (type_op) {
          case "transfer":
            this.transfer(data)
          break;
          case "account_witness_vote":
            this.account_witness_vote(data)
          break;
          case "account_witness_proxy":
            this.account_witness_proxy(data)
          break;
          default:
            
          break;
        }
    }
    async transfer(data){
        if(!data.to || !data.amount){
            let msg=!data.to ? "To is required" : (!data.amount ? "Amount is required" : null);
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null)
            this.props.updateOperation("transfer")
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }
        
        let a1=await existAccount(client,data.to);
        if(!a1){
            let msg=`Account ${data.to} dont exist`;
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null)
            this.props.updateOperation("transfer")
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }
        
        let amount=data.amount.split(" ");
        if(amount.length<2 || amount[1]!=="WLS" || typeof parseFloat(amount[0])!="number" ){
            let msg="Amount err";
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null)
            this.props.updateOperation("transfer")
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }

        let obj={
            amount: `${(parseFloat(amount[0])%2===0) ? parseFloat(amount[0]).toFixed(3) : (Math.floor(parseFloat(amount[0]) * 1000) / 1000).toFixed(3) } ${amount[1]}`,
            from: (data.from ? data.from : null),
            memo: (data.memo ? data.memo : ""),
            to: data.to
        };
        this.props.updateSusses(true);
        this.props.updateMsg(null)
        this.props.updateData(obj)
        this.props.updateOperation("transfer")
        setTimeout(()=>{ 
            this.props.updateLoading(false);
        },2000)
    }
    async account_witness_proxy(data){
        if(!data.proxy || !data.account){
            let msg=!data.proxy ? "proxy is required" : (!data.account ? "account is required" : null );
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null);
            this.props.updateOperation("account_witness_proxy");
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }
        console.log(typeof data.proxy)
        
        if(typeof data.proxy!=='string' || typeof data.account!=='string'){
            let msg=(typeof data.proxy!=='string') ? "proxy is err" : ((typeof data.account) ? "account is err" : null );
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null);
            this.props.updateOperation("account_witness_proxy");
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }

        let obj={
            account:data.account,
            proxy:data.proxy
        };
        this.props.updateSusses(true);
        this.props.updateMsg(null)
        this.props.updateData(obj);
        this.props.updateOperation("account_witness_proxy");
        setTimeout(()=>{ 
            this.props.updateLoading(false);
        },2000)
    }

    async account_witness_vote(data){
        if(!data.witness || !data.approve){
            let msg=!data.witness ? "witness is required" : (!data.approve ? "approve is required" : null );
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null);
            this.props.updateOperation("account_witness_vote");
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }

        let a1=await existAccount(client,data.witness);
        if(!a1){
            let msg=`account ${data.witness} dont exist`;
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null);
            this.props.updateOperation("account_witness_vote");
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;
        }
        var bol=data.approve==="true" ? true :(data.approve==="false" ? true : false)
        if(!bol || typeof data.witness!=='string'){
            let msg=bol ? "witness is err" : ((typeof data.witness) ? "approve is err" : null );
            this.props.updateSusses(false);
            this.props.updateMsg(msg)
            this.props.updateData(null);
            this.props.updateOperation("account_witness_vote");
            setTimeout(()=>{ 
                this.props.updateLoading(false);
            },2000)
            return;  
        }
        
        let obj={
            account:null,
            approve:(data.approve==='false' ? false : true),
            witness: data.witness
        };
        this.props.updateSusses(true);
        this.props.updateMsg(null)
        this.props.updateData(obj);
        this.props.updateOperation("account_witness_vote");
        setTimeout(()=>{ 
            this.props.updateLoading(false);
        },2000)
    }
    render() {
        if(this.props.loading){
            return(
                <div className="appOperation">
                    <img alt="loading Page" src="/assets/loading.svg" />
                </div>
            )
        }
        if(!this.props.susses){
            return (
                <div className="appOperation">
                <div className="operation">
                    <div className="border_Operation">
                        <div className="icon_app">
                            <img alt="imagen icon" className="iconimage" src="https://cdn.steemitimages.com/DQmcART3gMBkZEv6JzM4Wkv192aS5bzZoHVwomfcdX2k5mW/Whaleshares-Text.png" />
                        </div>
                        <div className="body_Operation">
                        <ErrorOperation message={this.props.msg} />
                        </div>
                        <div className="footer_Operation">
                            tools whaled.live
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div className="appOperation">
                <div className="operation">
                    <div className="border_Operation">
                        <div className="icon_app">
                            <img alt="imagen icon" className="iconimage" src="https://cdn.steemitimages.com/DQmcART3gMBkZEv6JzM4Wkv192aS5bzZoHVwomfcdX2k5mW/Whaleshares-Text.png" />
                        </div>
                        <div className="body_Operation">
                        {
                            !this.props.confirmOperation
                            ?
                            <PreOperacion />
                            :
                            <FormOperation />
                        }
                        </div>
                        <div className="footer_Operation">
                            tools whaled.live
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps  = dispatch => ({
    updateLoading: value => { dispatch(updateLoading(value)) },
    updateSusses: value => { dispatch(updateSusses(value)) },
    updateData: value =>{ dispatch(updateData(value)) },
    updateOperation: value =>{ dispatch(updateOperation(value)) },
    updateMsg: value =>{ dispatch(updateMsg(value)) }
})

const stateProsp  = state =>({ 
    loading: state.loading,
    susses:state.susses,
    operation: state.operation,
    confirmOperation: state.confirmOperation,
    msg: state.msg
})

export default connect( stateProsp,mapDispatchToProps )(Operation);