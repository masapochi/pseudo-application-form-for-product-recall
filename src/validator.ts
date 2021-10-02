import * as yup from "yup";

const profileSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  verify_email: yup.string().required(),
  address: yup.string().required(),
  zip: yup.string().required(),
  tel: yup.string().required(),
});

const recallSchema = yup.object().shape({
  purchased_date: yup.string().required(),
  purchased_shop: yup.string().required(),
  situation: yup.string().required(),
  pickup_date: yup.string().required(),
  pickup_time: yup.string().required(),
});

const itemsSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      purchased_count: yup.number().required(),
    })
  ),
});

export { profileSchema, recallSchema, itemsSchema };
