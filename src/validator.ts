import * as yup from "yup";

const profileSchema = yup.object().shape({});

const recallSchema = yup.object().shape({});

const validationSchema = yup.object().shape({
  items: yup.array().of(
    yup
      .object()
      .shape({
        purchased_count: yup.number().required(),
      })
      .required()
  ),
  purchased_date: yup
    .string()
    .required()
    .nullable(true)
    .label('"Purchased Date"'),
  purchased_shop: yup.string().required().label('"Purchased Shop"'),
  situation: yup.string().required().label('"Situation"'),
  pickup_date: yup.string().required().nullable(true).label('"Pickup Date"'),
  pickup_time: yup.string().required().label('"Pickup Time"'),
  name: yup.string().required().label('"Name"'),
  email: yup.string().required().email().label('"Email"'),
  verify_email: yup
    .string()
    .required()
    .email()
    .oneOf([yup.ref("email")], "Email does not match")
    .label('"Verify Email"'),
  address: yup.string().required().label('"Address"'),
  zip: yup.string().required().label('"Zip"'),
  tel: yup.string().required().label('"Tel"'),
});

export { validationSchema };
