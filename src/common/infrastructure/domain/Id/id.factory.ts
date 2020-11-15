import { IdFactory } from '../../../domain/service/id.factory';
import { v4 as uuidv4 } from 'uuid';

export class UUIDFactory implements IdFactory {
  id(): string {
    return uuidv4();
  }
}