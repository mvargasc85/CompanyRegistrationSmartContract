import CompanyRegistrationContract from "../build/contracts/CompanyRegistration.json";
import contract from "truffle-contract";

export default async(provider) => {
    const companyRegistration = contract(CompanyRegistrationContract);
    companyRegistration.setProvider(provider);

    let instance = await companyRegistration.deployed();
    return instance;
}