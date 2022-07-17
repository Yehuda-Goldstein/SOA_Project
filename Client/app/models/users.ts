export class UserModel {
  constructor(
    public name: string = '',
    public password: string = '',
    public isActive: boolean=false
  ) {}
}
