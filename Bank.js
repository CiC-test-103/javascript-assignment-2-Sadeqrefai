// 🏦 Bank and Account System 

// Account Class: 
class OpenAccount {
    constructor(name, balance = 0) {
        this.name = name; 
        this.balance = balance; 
        this.transactionHistory = []; 
    }

    // Account Deposit 
    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push({ transactionType: 'Deposit', amount });
        console.log(`Deposit amount is: ${amount}. New balance is: ${this.balance}`);
    }

    // Account Withdraw 
    withdraw(amount) {
        if (amount > this.balance) {
            console.log('Exceed balance amount');
            return;
        }
        this.balance -= amount;
        this.transactionHistory.push({ transactionType: 'Withdraw', amount });
        console.log(`Amount withdrawn is: ${amount}. New balance: ${this.balance}`);
    }

    // Money Transfer 
    transfer(amount, Beneficiary) {
        if (amount > this.balance) {
            console.log('Exceed balance amount');
            return;
        }
        this.balance -= amount;
        Beneficiary.balance += amount;
        this.transactionHistory.push({ transactionType: 'Transfer', amount, to: Beneficiary.name });
        Beneficiary.transactionHistory.push({ transactionType: 'Received', amount, from: this.name });
        console.log(`Amount: ${amount} transferred to: ${Beneficiary.name}. New balance: ${this.balance}`);
    }

    // Check account balance
    verifyBalance() {
        console.log(`Current balance is: ${this.balance}`);
        return this.balance;
    }

    // View history
    viewTransactionHistory() {
        console.log('Transaction History:', this.transactionHistory);
        return this.transactionHistory;
    }
}

// Bank Class
class Bank {
    constructor() {
        this.accounts = []; 
    }

    // Create a new bank account
    createBankAccount(name, DepositAmount) {
        const newBankAccount = new OpenAccount(name, DepositAmount);
        this.accounts.push(newBankAccount);
        return newBankAccount;
    }

    // Find Bank account by name
    findBankAccount(name) {
        return this.accounts.find(account => account.name === name);
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createBankAccount('John Doe', 1000);
    const janeAccount = bank.createBankAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.verifyBalance();
    const janeFinalBalance = janeAccount.verifyBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

console.log(testBankOperations());
