pragma solidity ^0.4.24;

contract CompanyRegistration {

  address public owner;

  struct Company{
      uint256 companyId;
      string companyName;
      string status;
      string observations;
  }

  struct Customer {
      uint loyaltyPoints;
      uint totalFormality;
  }  

  struct Formality {
      uint id;
      string name;
      string entity;
      uint price;
  }

  uint etherPerPoint = 0.5 ether;

  Formality[] public formalities;
  mapping(address => Company) private companies;
  mapping(address => bool) private registeredCompanies;
  mapping(address => Customer) public customers;
  mapping(address => Formality[]) public customerFormalities;
  mapping(address => uint) public customerTotalFormalities;
  
  event FormalityAccomplished(address indexed customer, uint price, string formality);

  constructor() {

    owner = msg.sender;   
    formalities.push(Formality(1,'Constituir Sociedad','Notario', 4 ether));
    formalities.push(Formality(2,'Inscribir Sociedad','Registro de Propiedad', 3 ether));
    formalities.push(Formality(3,'Registro de Contribuyentes','Ministerio de Hacienda', 3 ether));
    formalities.push(Formality(4,'Seguro de Riesgos de Trabajo','INS', 3 ether)); 
    formalities.push(Formality(6,'Permiso de Funcionamiento','Ministerio de Salud', 3 ether));
    formalities.push(Formality(5,'Registro como Patrono','CCSS', 3 ether));
    formalities.push(Formality(7,'Abrir Cuenta Bancaria','Bancos', 3 ether));
  }   

  function accomplishFormality(uint formalityIndex) public payable {
      Formality formality = formalities[formalityIndex];
      require(msg.value == formality.price);

      Customer storage customer = customers[msg.sender];
      customer.loyaltyPoints += 5;
      customer.totalFormality += 1;
      customerFormalities[msg.sender].push(formality);
      delete formalities[formalityIndex];
      customerTotalFormalities[msg.sender] ++;

      FormalityAccomplished(msg.sender, formality.price, formality.name);
  }

  function totalFormalities() public view returns (uint) {
      return formalities.length;
  }

  function redeemLoyaltyPoints() public {
      Customer storage customer = customers[msg.sender];
      uint etherToRefund = etherPerPoint * customer.loyaltyPoints;
      msg.sender.transfer(etherToRefund);
      customer.loyaltyPoints = 0;
  }

  function getRefundableEther() public view returns (uint) {
      return etherPerPoint * customers[msg.sender].loyaltyPoints;
  }

  function getCompanyRegistrationBalance() public isOwner view returns (uint) {
      address companyRegistrationAddress = this;
      return companyRegistrationAddress.balance;
  }

  modifier isOwner() {
      require(msg.sender == owner);
      _;
  }

  function registerCompany(address account, uint256 companyId, string name, string status, string observations) public {
        require(!companyRegistered(account));
        Company storage company = companies[account];
        company.companyId = companyId;
        company.companyName = name;
        company.status = status;
        company.observations = observations;
        registeredCompanies[account] = true;
    }

     function companyRegistered(address addr) private view returns  (bool) {
        return registeredCompanies[addr];
    }
}
