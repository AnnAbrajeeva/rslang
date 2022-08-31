/* eslint-disable */
import { useFormik } from "formik";
import { useTypedDispatch } from "../../../../../redux/hooks";
import { signIn } from "../../../../../redux/thunks";
import { validationSchema } from "../utils/validationSchema";

export const useFormikCustom = () => {
  const dispatch = useTypedDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signIn(values));
    },
  });

  return formik;
}; 