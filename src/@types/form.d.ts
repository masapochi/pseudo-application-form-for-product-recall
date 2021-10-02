type ItemType = {
  purchased_count: number;
  model: string;
  color: string;
  textColor: string;
  code: string;
};

type ProfileType = {
  name: string;
  zip: string;
  address: string;
  tel: string;
  email: string;
  verify_email: string;
};

type RecallInfoType = {
  pickup_date: string;
  pickup_time: string;
  purchased_date: string;
  purchased_shop: string;
  situation: string;
};
