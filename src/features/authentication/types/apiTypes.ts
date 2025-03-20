import { responseStatus } from "@/common/types/responseTypes"
import { User } from "./user"

export type loginRequestBody = {
  email: string,
  password: string,
}

export type loginResponseBody = {
  status: responseStatus,
  token: string,
  data: {
    user: User,
  }
}

export type signupRequestBody = {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

export type signupResponseBody = {
  status: responseStatus,
  token: string,
  data: {
    user: User,
  }
}