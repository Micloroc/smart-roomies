import { IdFactory } from '../../../domain/id/id.factory';
import { v4 as uuidv4 } from 'uuid';

export class UUIDFactory implements IdFactory {
  id(): string {
    return uuidv4();
  }
}