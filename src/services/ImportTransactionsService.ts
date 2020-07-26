import Transaction from '../models/Transaction';
import csv from 'csvtojson';
import path from 'path';
import uploadConfig from '../config/upload';
import CreateTransactionService from '../services/CreateTransactionService';

class ImportTransactionsService {
  async execute(importFileName: string): Promise<Transaction[] | any> {
    const csvFilePath = path.join(uploadConfig.directory, importFileName);
    const csvImportedTransactionsData = await csv().fromFile(csvFilePath);

    const createTransaction = new CreateTransactionService();
    const transactions = [];

    for (const {
      title,
      type,
      value,
      category,
    } of csvImportedTransactionsData) {
      if (title && type && value) {
        const transaction = await createTransaction.execute({
          title,
          type,
          value,
          category,
        });

        transactions.push(transaction);
      }
    }

    return transactions;
  }
}

export default ImportTransactionsService;
