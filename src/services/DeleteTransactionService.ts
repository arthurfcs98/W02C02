import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { getCustomRepository, TransactionRepository } from 'typeorm';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const validateTransactionId = await transactionsRepository.findOne(id);

    if (!validateTransactionId) {
      throw new AppError('Invalid transiction ID', 400);
    }

    await transactionsRepository.remove(validateTransactionId);
  }
}

export default DeleteTransactionService;
