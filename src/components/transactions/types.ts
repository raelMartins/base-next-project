import { dummy_transactions } from './dummy_data';

export type TransactionEntryType = (typeof dummy_transactions.data)[0];

export interface TransactionEntryInstance {}
