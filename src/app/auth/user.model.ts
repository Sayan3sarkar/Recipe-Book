export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }

  public get token() { // setting a getter to retrieve token when new user is created
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) { // dont return anything if token does'nt exist
      // or token has expired
      return null;
    }
    return this._token;
  }
}
