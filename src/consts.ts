export const PICKUP_TIMES = Object.freeze([
  { name: "時間指定なし" },
  { name: "午前中" },
  { name: "14～16時" },
  { name: "16～18時" },
  { name: "18～20時" },
  { name: "19～21時" },
]);

export const USER_PROFILE = {
  name: "",
  zip: "",
  address: "",
  tel: "",
  email: "",
  verify_email: "",
};

export const RECALL_INFO = {
  purchased_date: "",
  purchased_shop: "",
  situation: "",
  pickup_date: "",
  pickup_time: PICKUP_TIMES[0].name,
};

export const ITEM_LIST = [
  {
    color: "電球色",
    code: "",
    model: "SCL-75L-LGP",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    color: "昼光色",
    code: "",
    model: "SCL-75D-LGP",
    textColor: "#2776c2",
    purchased_count: 0,
  },

  {
    color: "電球色",
    code: "",
    model: "SCL-150L-LGP",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    color: "昼光色",
    code: "",
    model: "SCL-150D-LGP",
    textColor: "#2776c2",
    purchased_count: 0,
  },
  {
    color: "電球色",
    code: "人感センサー付",
    model: "SCL-75LMS-LGP",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    color: "昼光色",
    code: "人感センサー付",
    model: "SCL-75DMS-LGP",
    textColor: "#2776c2",
    purchased_count: 0,
  },
  {
    color: "電球色",
    code: "人感センサー付",
    model: "SCL-150LMS-LGP",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    color: "昼光色",
    code: "人感センサー付",
    model: "SCL-150DMS-LGP",
    textColor: "#2776c2",
    purchased_count: 0,
  },
];
