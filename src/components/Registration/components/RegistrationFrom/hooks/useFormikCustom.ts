import { useFormik } from "formik";
import { useTypedDispatch } from "../../../../../redux/hooks";
import { createUser } from "../../../../../redux/thunks";
import validationSchema from "../utils/validationSchema";

export default function useFormikCustom() {
  const dispatch = useTypedDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      changepassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createUser({
        name: values.username,
        email: values.email,
        password: values.password,
      }));
    },
  });

  return formik;
};