const useValidation = () => {
  const validatorXSS = (text: string) => {
    if (!text) return true
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |]+$/
    if (!regex.test(text)) return false
    return true
  }
  const emailValidator = (email: string) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return email === '' || email.match(regExp) != null
  }
  const passwordValidator = (password: string) => {
    const reg =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[`~!@$!%*#^?&\\(\\)\\-_=+])(?!.*[^a-zA-z0-9`~!@$!%*#^?&\\(\\)\\-_=+]).{8,16}$/
    return password === '' || reg.test(password)
  }

  return {
    validatorXSS,
    emailValidator,
    passwordValidator,
  }
}
export { useValidation }
