export abstract class PasswordEncryptor {
  async abstract encrypt(password: string): Promise<string>
  async abstract validate(password: string, hash: string): Promise<boolean>
}