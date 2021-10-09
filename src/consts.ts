import dayjs from "dayjs";

const dt = dayjs();
export const current_date = dt.format("YYYY-MM-DD");

export const minPickupDate = dt.add(5, "day").format("YYYY-MM-DD");

export const PICKUP_TIMES = Object.freeze([
  { name: "No time specification" },
  { name: "In the morning" },
  { name: "Between 14 ~ 16 p.m." },
  { name: "Between 16 ~ 18 p.m." },
  { name: "Between 18 ~ 20 p.m." },
  { name: "Between 20 ~ 21 p.m." },
]);

const PROFILE = {
  name: "",
  zip: "",
  address: "",
  tel: "",
  email: "",
  verify_email: "",
};

const RECALL = {
  purchased_date: "",
  purchased_shop: "",
  situation: "",
  pickup_date: "",
  pickup_time: PICKUP_TIMES[0].name,
};

const ITEMS = [
  {
    model: "MK-100-R",
    color: "Red",
    code: "100-1",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    model: "MK-100-B",
    color: "Blue",
    code: "100-2",
    textColor: "#2776c2",
    purchased_count: 0,
  },

  {
    model: "MK-200-R",
    color: "Red",
    code: "200-1",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    model: "MK-200-B",
    color: "Blue",
    code: "200-2",
    textColor: "#2776c2",
    purchased_count: 0,
  },
  {
    model: "MK-300-R",
    color: "Red",
    code: "300-1",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    model: "MK-300-B",
    color: "Blue",
    code: "300-2",
    textColor: "#2776c2",
    purchased_count: 0,
  },
  {
    model: "MK-400-R",
    color: "Red",
    code: "400-1",
    textColor: "#cb4818",
    purchased_count: 0,
  },
  {
    model: "MK-400-B",
    color: "Blue",
    code: "400-2",
    textColor: "#2776c2",
    purchased_count: 0,
  },
];

export const INITIAL_FORM = {
  current_date,
  minPickupDate,
  ...PROFILE,
  ...RECALL,
  items: ITEMS,
};
