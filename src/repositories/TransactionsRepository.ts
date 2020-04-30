import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.transactions;
    const totalIncome = allTransactions
      .filter(elem => elem.type === 'income')
      .reduce((acc, val) => {
        return acc + val.value;
      }, 0);

    const totalOutcome = allTransactions
      .filter(elem => elem.type === 'outcome')
      .reduce((acc, val) => {
        return acc + val.value;
      }, 0);

    const totalBalance = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };
  }

  public create({ title, value, type }: CreateDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
