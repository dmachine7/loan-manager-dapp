pragma solidity ^0.8.4;

contract LoanManagementSystem {
    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 startDate;
        address borrower;
        bool isApproved;
        bool isPaidBack;
    }
    
    mapping(address => Loan[]) public loans;
    
    function requestLoan(uint256 amount, uint256 interestRate, uint256 duration) public {
        require(amount > 0, "Loan amount must be greater than zero.");
        require(interestRate > 0, "Interest rate must be greater than zero.");
        require(duration > 0, "Loan duration must be greater than zero.");
        
        Loan memory newLoan = Loan({
            amount: amount,
            interestRate: interestRate,
            duration: duration,
            startDate: block.timestamp,
            borrower: msg.sender,
            isApproved: false,
            isPaidBack: false
        });
        
        loans[msg.sender].push(newLoan);
    }
    
    function approveLoan(address borrower, uint256 loanIndex) public {
        require(msg.sender == borrower, "Only the borrower can approve the loan.");
        loans[borrower][loanIndex].isApproved = true;
    }
    
    function payBackLoan(address borrower, uint256 loanIndex) public payable {
        require(msg.sender == borrower, "Only the borrower can pay back the loan.");
        require(loans[borrower][loanIndex].isApproved, "Loan must be approved before it can be paid back.");
        require(!loans[borrower][loanIndex].isPaidBack, "Loan has already been paid back.");
        require(msg.value >= loans[borrower][loanIndex].amount, "Insufficient funds to pay back loan.");
        
        loans[borrower][loanIndex].isPaidBack = true;
        
        if (msg.value > loans[borrower][loanIndex].amount) {
            payable(borrower).transfer(msg.value - loans[borrower][loanIndex].amount);
        }
    }
    
    function getLoans(address borrower) public view returns (Loan[] memory) {
        return loans[borrower];
    }
}