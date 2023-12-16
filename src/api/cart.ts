import { req } from "./https";

const cart = {
  // 讀取訪客購物車資料
  apiGetVisitorCartData(data: { courseIds: string[]; couponCode: string }) {
    return req("post", "/goldFlow/visitorsCart", data);
  },
  // 取得登入者的購物車
  apiGetCartData() {
    return req("get", "/goldFlow/userCart", null);
  },
  // 新增
  apiPostCartData(data: { courseId: string }) {
    return req("post", "/goldFlow/userCartCourse", data);
  },
  // 移除購物車項目
  apiDeleteCartData(data: { courseId: string }) {
    return req("delete", "/goldFlow/userCartCourse", data);
  },
  // 讀取有效優惠券
  apiGetCoupon() {
    return req("get", "goldFlow/validCoupon");
  },
  // 新增優惠券
  apiPostCoupon(data: { couponCode: string }) {
    return req("post", "/goldFlow/userCartCoupon", data);
  },
  // 移除優惠券
  apiDeleteCoupon() {
    return req("delete", "/goldFlow/userCartCoupon");
  },
  // 新增訂單
  apiCreateOrder(data: { courseIds: string[]; couponCode: string }) {
    return req("post", "/goldFlow/createOrder", data);
  },
  // 確認訂單
  apiPostOrderCheck(data: { _id: string }) {
    return req("post", "/goldFlow/checkOrder", data);
  },
};

export default cart;
