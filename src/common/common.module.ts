import { Module, Provider } from '@nestjs/common';
import { IdFactory } from './domain/service/id.factory';
import { UUIDFactory } from './infrastructure/domain/Id/id.factory';
import { PasswordEncryptor } from './domain/service/password-encryptor';
import { BcryptEncryptor } from './infrastructure/domain/password/bcrypt-encryptor.service';

const IdFactoryProvider: Provider = {
  provide: IdFactory,
  useClass: UUIDFactory,
};

const PasswordEncryptorProvider: Provider = {
  provide: PasswordEncryptor,
  useClass: BcryptEncryptor,
};

@Module({
  providers: [IdFactoryProvider, PasswordEncryptorProvider],
  exports: [IdFactoryProvider, PasswordEncryptorProvider],
})
export class CommonModule {
}
