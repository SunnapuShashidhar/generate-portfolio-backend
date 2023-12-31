export const checkEmailValidation = (email: string) => {
  const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = regEx.test(String(email).toLowerCase().trim());
  console.log("validation", email, "--", validEmail);
  if (!validEmail) {
    return false;
  }
  return true;
};

export const passwrodCalidation = (
  password: string,
  confirmpasword: string
): string | boolean => {
  const passwordRgux =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (password !== confirmpasword) {
    return "password and confirm password is matching..!";
  } else if (password.match(passwordRgux)) {
    return true;
  } else {
    return "Password Should be strong..!";
  }
};
