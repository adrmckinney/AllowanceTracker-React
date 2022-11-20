export const validateEmail = (email: string) => {
  return {
    emailExists: email?.length > 0,
    validEmail: !!email
      ?.toLowerCase()
      ?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
  }
}

export const validatePhoneNumber = (number: string) => {
  return {
    numberExists: number?.length > 0,
    validNumberLength: true,
    //   typeof number === 'string' ? number?.length === 10 : number?.toString?.length === 10,
  }
}

export const validatePassword = (password: string) => {
  return {
    passwordExists: password?.length > 0,
    validPasswordLength: password?.length >= 8,
    hasNumber: /\d/.test(password),
    hasUpperCase: password?.toLowerCase() !== password,
    hasLowerCase: password?.toUpperCase() !== password,
    hasSpecialCharacter: !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password),
  }
}

export const validateConfirmPassword = (password: string, confirm_password: string) => {
  return {
    passwordMatches: password && password === confirm_password,
  }
}
