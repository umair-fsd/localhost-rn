class User {
  constructor (
    public id: string,
    public age: number,
    public email: string,
    public phonenumber: string,
    public sex: string,
    public firstname: string,
    public lastname: string,
    public bio: string,
    public whatAmIDoing: string,
    public location: string,
    public isVisible: boolean,
    public latitude: number,
    public longitude: number,
    public profileImageUrl: string,
    public showMeCriteria: object
  ) { }
}

export default User
