import * as yup from "yup";
import { minPickupDate } from "./consts";

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
  pickup_date: yup
    .date()
    .min(minPickupDate)
    .required()
    .nullable(true)
    .label('"Pickup Date"'),
  pickup_time: yup.string().required().label('"Pickup Time"'),
  name: yup.string().required().label('"Name"'),
  email: yup.string().required().email().label('"Email"'),
  verify_email: yup
    .string()
    .email()
    .oneOf([yup.ref("email")], "Email does not match")
    .required()
    .label('"Verify Email"'),
  address: yup.string().required().label('"Address"'),
  zip: yup
    .string()
    .matches(
      /(^[0-9]{3}[0-9]{4}$)|(^[0-9]{3}-[0-9]{4})$/,
      "This field must be a 7-digit number or xxx-xxxx"
    )
    .required()
    .label('"Zip"'),
  tel: yup
    .string()
    .matches(/^[0-9].+/, "This field must be only numbers")
    .required()
    .label('"Tel"'),
});

export { validationSchema };
