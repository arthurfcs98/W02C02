import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import transactionsRouter from '../routes/transactions.routes';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // const { income } = await this.createQueryBuilder('transactions')
    //   .select('SUM(transactions.value)', 'income')
    //   .where('transactions.type = :type', { type: 'income' })
    //   .getRawOne();

    // const { outcome } = await this.createQueryBuilder('transactions')
    //   .select('SUM(transactions.value)', 'outcome')
    //   .where('transactions.type = :type', { type: 'outcome' })
    //   .getRawOne();

    const transactions = await this.find();

    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
