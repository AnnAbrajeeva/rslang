/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Requires you to enter an email'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .required('A password is required'),
});