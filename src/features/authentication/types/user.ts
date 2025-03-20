export type User = {
  id: number,
  name: string,
  email: string,
  photo?: string,
  passwordChangedAt?: string,
  passwordResetToken?: string,
  passwordResetExpires?: string,
  active: boolean,
}