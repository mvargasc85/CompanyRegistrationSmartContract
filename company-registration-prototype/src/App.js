import React, { Component } from "react";
import Panel from "./Panel";
import getWeb3 from "./getWeb3";
import CompanyRegistrationContract from "./companyRegistration";
import { CompanyRegistrationService } from "./companyRegistrationService";
import { ToastContainer } from "react-toastr";
import { stat } from "fs";

const converter = (web3) => {
    return (value) => {
        return web3.utils.fromWei(value.toString(), 'ether');
    }
}

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyStatus: "En revisión",
            balance: 0,
            refundableEther: 0,
            account: undefined,
            formalities: [],
            customerFormalities: []
        };
    }

    async componentDidMount() {
        this.web3 = await getWeb3();
        this.toEther = converter(this.web3);
        this.companyRegistration = await CompanyRegistrationContract(this.web3.currentProvider);
        this.companyRegistrationService = new CompanyRegistrationService(this.companyRegistration);

        var account = (await this.web3.eth.getAccounts())[0];

        let formalityAccomplished = this.companyRegistration.FormalityAccomplished();
        formalityAccomplished.watch(function (err, result) {
            if(this.state.customerFormalities.length===6){
                  // company data must be obtained from the web platform by the companyId    this.validateCompanyRegistration(1, this.state.account);
              var observations = 'Empresa Registrada. Dada de alta a partir de ' + new Date();
             this.container.success(`Todos los trámites han sido completados. ` + observations, 'Registro de Empresas');
                this.setState({
                    companyStatus: observations
                });
            }

        }.bind(this));

        

        //para que reaccione al cambio de cuenta
        this.web3.currentProvider.publicConfigStore.on('update', async function (event) {
            this.setState({
                account: event.selectedAddress.toLowerCase()
            }, () => {
                this.load();
            });
        }.bind(this));

        this.setState({
            account: account.toLowerCase()
        }, () => {
            this.load();
        });
    }

    async getBalance() {
        let weiBalance = await this.web3.eth.getBalance(this.state.account);
        this.setState({
            balance: this.toEther(weiBalance)
        });
    }

    async getFormalities() {
        let formalities = await this.companyRegistrationService.getFormalities();
        this.setState({
            formalities
        });
    }

    async getRefundableEther(){
        let refundableEther = this.toEther(await this.companyRegistrationService.getRefundableEther(this.state.account));
        this.setState({
            refundableEther
        });
    }

    async refundLoyaltyPoints(){
        await this.companyRegistrationService.redeemLoyaltyPoints(this.state.account);
    }

    async getCustomerFormalities() {
        let customerFormalities = await this.companyRegistrationService.getCustomerFormalities(this.state.account);
        this.setState({
            customerFormalities
        });
    }

    async acomplishFormality(formalityIndex, formality){
        await this.companyRegistrationService.acomplishFormality(
            formalityIndex,
            this.state.account,
            formality.price);
    }

    async getCompanyDoomyData(companyId){
        var companyName = 'Empresa de prueba';
        return  {
            companyId:companyId,
            companyName : companyName,
            status : 'Registered',
            observations : 'Empresa ' + companyName + ' Registrada. Dada de alta a partir de ' + new Date()
        }
    }



    async validateCompanyRegistration(companyId, account){
        var company = await this.getCompanyDoomyData(companyId);
        await  this.companyRegistrationService.registerCompany(account, company.companyId,company.companyName,company.status, company.observations);
        this.container.success(`Todos los trámites han sido completados. ` + company.observations, 'Registro de Empresas');
        this.setState({
            companyStatus: company.observations
        });       
    }

   
    async load() {
        this.getBalance();
        this.getFormalities();
        this.getCustomerFormalities();
        this.getRefundableEther();
    }

    render() {
        return <React.Fragment>
            <div className="jumbotron">
                <h5 className="display-4">Los trámites para registrar una empresa en un solo lugar!</h5>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Panel title="Balance">
                        <p><strong>{this.state.account}</strong></p>
                        <span><strong>Balance</strong>: {this.state.balance} Ether</span>
                        <br></br><br></br><span><strong>Puntos reembolsables</strong>: {this.state.refundableEther} Ether</span>
                        <button className="btn btn-sm btn-success text-white" onClick={this.refundLoyaltyPoints.bind(this)}>Canjear puntos</button>

                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Estado">
                    <span><strong>Empresa</strong>: {this.state.companyStatus}</span>
                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Panel title="Trámites a Realizar" id="formalitiesToDo">
                        {this.state.formalities.map((formality, i) => {
                            if(formality.name!="")
                            return <div key={i}>
                                <span>{formality.name}  - {formality.entity} - cost: {this.toEther(formality.price)}</span>
                                <button id={formality.id} className="btn btn-sm btn-success text-white" onClick={() => this.acomplishFormality(i, formality)}>+</button>
                            </div>
                        })}

                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Trámites Realizados">               

                    {this.state.customerFormalities.map((formality, i) => {
                        var li = $("#formalitiesList").find( "#" + formality.id );
                        li.addClass("checked");                       
                       
                        /*    return <div key={i}>
                                <span>{formality.name} - cost: {this.toEther(formality.price)}</span>                  </div>*/

                         
                    })}
                  
                                        
                   <ul id="formalitiesList">
                        <li id="1">Constituir Sociedad - Notario</li>
                        <li id="2">Inscribir Sociedad - Registro de Propiedad</li>
                        <li id="3">Registro de Contribuyentes - Hacienda</li>                        
                        <li id="4">Seguro de Riesgos de Trabajo - INS</li>
                        <li id="5">Registro como Patrono - CCSS</li>
                        <li id="6">Permiso de Funcionamiento - Ministerio de Salud </li>
                        <li id="7">Cuenta Bancaria - Bancos</li>
                    </ul>
                          
                    
                    </Panel>
                </div>
            </div>
            <ToastContainer ref={(input) => this.container = input}
                className="toast-top-right" />
        </React.Fragment>
    }
}