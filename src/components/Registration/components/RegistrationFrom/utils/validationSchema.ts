import * as yup from 'yup'

const validationSchema = yup.object({
  username: yup
    .string()
    .min(2, 'Username must contain at least 2 characters')
    .required('Requires the user name to be entered'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Requires you to enter an email'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .required('A password is required'),
  changepassword: yup.string().when('password', {
    is: (val: string) => !!(val && val.length > 0),
    then: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  }),
})

export default validationSchema
