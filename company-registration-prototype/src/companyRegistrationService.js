export class CompanyRegistrationService {
    constructor(contract) {
        this.contract = contract;
    }

    async acomplishFormality(requirementIndex, from, value){
        return this.contract.accomplishFormality(requirementIndex, {from, value});
    }

    async registerCompany(account, companyId, companyName, status, observations)  {
        return  this.contract.registerCompany(account, companyId,companyName,status, observations);
    }

    async getFormalities() {
        let total = await this.getTotalFormalities();
        let formalities = [];
        for (var i = 0; i < total; i++) {
            let formality = await this.contract.formalities(i);
            formalities.push(formality);
        }

        return this.mapFormality(formalities);
    }

    async getCustomerFormalities(account){
        let customerTotalFormalities = await this.contract.customerTotalFormalities(account);
        let formalities = [];
        for(var i = 0; i < customerTotalFormalities; i++){
            let formality = await this.contract.customerFormalities(account,i);
            formalities.push(formality);
        }

        return this.mapFormality(formalities);
    }

    async getTotalFormalities() {
        return (await this.contract.totalFormalities()).toNumber();
    }

    getRefundableEther(from){
        return this.contract.getRefundableEther({from});
    }

    redeemLoyaltyPoints(from){
        return this.contract.redeemLoyaltyPoints({from});
    }

    mapFormality(formalities) {
        return formalities.map(formality => {
            return {
                id: formality[0],
                name: formality[1],
                entity: formality[2],
                price: formality[3].toNumber()
            }
        });
    }
}