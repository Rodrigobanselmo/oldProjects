interface IHashProvider {
  compare(password: string, hash_password: string): Promise<boolean>;
}

export { IHashProvider };
