import { defineStore } from "pinia";
import type { AxiosResponse } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cart from "@/api/cart.js";

interface cartType {
  cover: string;
  discountPrice: number;
  isFree: boolean;
  price: number;
  title: string;
  instructorName: string;
  _id: string;
  time?: number;
  level?: string;
  total?: string;
  couponCode?: string;
  couponPrice?: Number;
  tagNames?: string[];
}
export const useCartStore = defineStore("cart", () => {
  const router = useRouter();
  const totalPrice = ref(0);
  const couponPrice = ref(0);
  const discountedPrice = ref(0);
  const cartData = ref<cartType[]>([]);
  const youMightLike = ref<cartType[]>([]);
  const courseIds = ref<string[]>([]);
  const visitorCartIds = ref<string[]>([]);
  async function getCartData() {
    if (localStorage.getItem("accessToken")) {
      const result = (await Cart.apiGetCartData()) as AxiosResponse;
      // console.log("getCartData", result);
      if (result.data.data) {
        cartData.value = result.data.data.shoppingCart;
        youMightLike.value = result.data.data.youMightLike;
        totalPrice.value = result.data.data.totalPrice;
        courseIds.value = result.data.data.courseIds;
        couponValue.value = result.data.data.couponCode;
        couponPrice.value = result.data.data.couponPrice;
        discountedPrice.value = result.data.data.discountedPrice;
      }
    } else {
      if (localStorage.getItem("visitorCartData") !== "") {
        visitorCartIds.value = JSON.parse(
          localStorage.getItem("visitorCartIds") as string
        );
        // console.log("訪客購物車 getData", visitorCartIds.value);
      } else {
        visitorCartIds.value = [];
      }
      // console.log("visitorCartIds.value", visitorCartIds.value);
      const result = (await Cart.apiGetVisitorCartData({
        courseIds: visitorCartIds.value,
        couponCode: "",
      })) as AxiosResponse;
      // console.log("訪客購物車 result getData", result.data);
      if (result.data.data) {
        cartData.value = result.data.data.shoppingCart;
        youMightLike.value = result.data.data.youMightLike;
        totalPrice.value = result.data.data.totalPrice;
        courseIds.value = result.data.data.courseIds;
      }
    }
  }
  async function addCart(id: string) {
    // console.log("addCart", id);
    if (localStorage.getItem("accessToken")) {
      const result = (await Cart.apiPostCartData({
        courseId: id,
      })) as AxiosResponse;
      if (result.data.isSuccess) {
        return {
          isSuccess: true,
          content: result.data.message,
        };
      } else {
        return {
          isSuccess: false,
          content: result.data.message,
        };
      }
    } else {
      console.log("訪客add cart");
      if (!visitorCartIds.value.includes(id)) {
        visitorCartIds.value.push(id);
        localStorage.setItem(
          "visitorCartIds",
          JSON.stringify(visitorCartIds.value)
        );
        if (visitorCartIds.value) {
          return {
            isSuccess: true,
            content: "加入成功",
          };
        } else {
          return {
            isSuccess: false,
            content: "新增失敗",
          };
        }
      } else {
        return {
          isSuccess: true,
          content: "已儲存在購物車當中",
        };
      }
    }
  }
  async function deleteCart(id: string) {
    // console.log("deleteCart", id);
    if (localStorage.getItem("accessToken")) {
      const result = (await Cart.apiDeleteCartData({
        courseId: id,
      })) as AxiosResponse;
      if (result.data.isSuccess) {
        getCartData();
        return {
          isSuccess: true,
          content: "刪除成功",
        };
      } else {
        return {
          isSuccess: false,
          content: "刪除失敗",
        };
      }
    } else {
      // console.log("訪客 deleteCart");
      const deleteIdx = visitorCartIds.value.findIndex((item) => item === id);
      // console.log("deleteIdx", deleteIdx);
      if (deleteIdx !== -1) {
        visitorCartIds.value.splice(deleteIdx, 1);
        localStorage.setItem(
          "visitorCartIds",
          JSON.stringify(visitorCartIds.value)
        );
        getCartData();
        return {
          isSuccess: false,
          content: "刪除成功",
        };
      } else {
        return {
          isSuccess: false,
          content: "刪除失敗",
        };
      }
    }
  }

  const orderData = ref<{
    shoppingCart: cartType[];
    totalPrice: Number;
    _id: string;
    discountedPrice?: Number;
  }>({
    shoppingCart: [],
    totalPrice: 0,
    _id: "",
    discountedPrice: 0,
  });

  const couponValue = ref(null);
  const couponOptions = ref([]);
  const couponLabel = ref("");
  async function getCouponSelectData() {
    const result = (await Cart.apiGetCoupon()) as AxiosResponse;
    const coupon = result.data.data.coupons.find(
      (item: { couponCode: null }) => item.couponCode === couponValue.value
    );
    couponLabel.value = coupon.tagNames[0];
    result.data.data.coupons.forEach(
      (item: { label: any; tagNames: string[] }) => {
        item.label = item.tagNames.join("、");
      }
    );
    couponOptions.value = result.data.data.coupons;
    // console.log("couponOptions.value", couponOptions.value);
  }

  async function createOrder() {
    // console.log("createOrder");
    if (localStorage.getItem("accessToken")) {
      const result = (await Cart.apiCreateOrder({
        courseIds: courseIds.value,
        couponCode: couponValue.value || "",
      })) as AxiosResponse;
      orderData.value = {
        shoppingCart: result.data.data.shoppingCart,
        totalPrice: result.data.data.totalPrice,
        _id: result.data.data._id,
        discountedPrice: result.data.data.discountedPrice,
      };
      router.push("/order");
      if (result.data.isSuccess) {
        return {
          isSuccess: true,
          result: result.data.message,
        };
      }
    } else {
      // console.log("dont have accessToken");
      router.push("/login");
      localStorage.setItem("fromVisitorCart", JSON.stringify(true));
      return {
        isSuccess: false,
        result: "結帳前請先登入",
      };
    }
  }

  async function addCoupon() {
    if (couponValue.value) {
      try {
        const result = (await Cart.apiPostCoupon({
          couponCode: couponValue.value,
        })) as AxiosResponse;
        // console.log("addCoupon", result);
        getCartData();
        if (result.data.isSuccess) {
          return {
            isSuccess: true,
            result: result.data.message,
          };
        }
      } catch (err) {
        return {
          isSuccess: false,
          result: "請選擇與課程相關的優惠券",
        };
        couponValue.value = null;
      }
    } else {
      deleteCoupon();
    }
  }
  async function deleteCoupon() {
    couponValue.value = null;
    if (!couponValue.value) {
      try {
        const result = (await Cart.apiDeleteCoupon()) as AxiosResponse;
        if (result.data.isSuccess) {
          getCartData();
          return {
            isSuccess: true,
            content: "優惠券" + result.data.message,
          };
        }
      } catch {
        return {
          isSuccess: false,
          content: "刪除失敗",
        };
      }
    }
    // console.log("deleteCoupon", couponValue.value);
  }
  interface goldFlowType {
    [index: string]: any;
  }
  const goldFlowData = ref<goldFlowType>({});
  async function checkOrder() {
    // console.log("checkOrder");
    const result = (await Cart.apiPostOrderCheck({
      _id: orderData.value._id,
    })) as AxiosResponse;
    if (result.data.isSuccess) {
      goldFlowData.value = result.data.data;
      // console.log("result", result.data.data);
      return {
        isSuccess: true,
        content: "確認訂單",
      };
    }
  }
  return {
    cartData,
    youMightLike,
    totalPrice,
    orderData,
    visitorCartIds,
    couponLabel,
    couponValue,
    couponOptions,
    couponPrice,
    discountedPrice,
    goldFlowData,
    addCart,
    deleteCart,
    createOrder,
    checkOrder,
    getCartData,
    addCoupon,
    deleteCoupon,
    getCouponSelectData,
  };
});
