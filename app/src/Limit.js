import * as yup from 'yup'

export default yup.object().shape({
    name: yup.string()
        .required("Please enter name")
        .min(3, "Username too short"),
    email: yup.string()
        .email("Not a valid email")
        .required("Please enter email"),
    password: yup.string()
        .required("Please enter password")
        .min(7, "Password is too short"),
    tos: yup.boolean(),
})