/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const validationSchema = yup.object({
  username: yup
    .string()
    .min(6, 'Username must contain at least 6 characters')
    .required('Requires the user name to be entered'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Requires you to enter an email'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .required('A password is required'),
  changepassword: yup.string().when("password", {
    is: (val: string) => (!!(val && val.length > 0)),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Passwords must match"
    )
  })
});