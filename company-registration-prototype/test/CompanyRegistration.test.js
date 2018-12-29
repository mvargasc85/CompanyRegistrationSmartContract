const CompanyRegistration = artifacts.require('CompanyRegistration');

let instance;

beforeEach(async () => {
    instance = await CompanyRegistration.new();
});

contract('CompanyRegistration', accounts => {
    it('should have available formalities', async () => {
        let total = await instance.totalFormalities();
        assert(total > 0);
    });

    it('should allow customers to buy a formalities providing its value', async () => {

        let formalities = await instance.formalities(0);
        let formalityName = formalities[0], price = formalities[1];

        await instance.acomplishFormality(0, { from: accounts[0], value: price });
        let customerFormality = await instance.customerFormalities(accounts[0], 0);
        let customerTotalFormalities = await instance.customerTotalFormalities(accounts[0]);

        assert(customerFormality[0], formalityName);
        assert(customerFormality[1], price);
        assert(customerTotalFormalities, 1);
    });

    it('should not allow customers to register formalities under the price', async () => {

        let formalities = await instance.formalities(0);
        let price = formalities[1] - 5000;
        try {
            await instance.acomplishFormality(0, { from: accounts[0], value: price });
        }
        catch (e) { return; }
        assert.fail();
    });

    it('should get the real balance of the contract', async() => {

        let formalities = await instance.formalities(0);
        let price = formalities[1];

        let formality2 = await instance.formalities(1);
        let price2 = formality2[1];

        await instance.acomplishFormality(0, { from: accounts[0], value: price});
        await instance.acomplishFormality(1, { from: accounts[0], value: price2});

        let newAirlineBalance = await instance.getCompanyRegistrationBalance();

        assert.equal(newAirlineBalance.toNumber(), price.toNumber() + price2.toNumber());
    });

    it('should allow customers to redeem loyalty points', async() => {
        
        let formalities = await instance.formalities(1);
        let price = formalities[1];

        await instance.acomplishFormality(1, { from: accounts[0], value : price});

        let balance = await web3.eth.getBalance(accounts[0]);
        await instance.redeemLoyaltyPoints({from: accounts[0]});
        let finalBalance = await web3.eth.getBalance(accounts[0]);

        let customer = await instance.customers(accounts[0]);
        let loyaltyPoints = customer[0];

        assert(loyaltyPoints, 0);
        assert(finalBalance > balance);
    });
});