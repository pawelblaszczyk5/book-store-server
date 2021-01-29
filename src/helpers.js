module.exports.basicEmailValidator = (email) => {
  return email.match(/^\S+@\S+$/);
}

module.exports.passwordValidator = (password) => {
  return password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
}
