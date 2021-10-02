type Item = {
  purchased_count: number;
  model: string;
  color: string;
  textColor: string;
  code: string;
};

type Form = {
  items: Item[];
  pickup_date: string;
  pickup_time: string;
  purchased_date: string;
  purchased_shop: string;
  situation: string;
  name: string;
  zip: string;
  address: string;
  tel: string;
  email: string;
  verify_email: string;
};
