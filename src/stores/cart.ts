import { defineStore } from "pinia";
import { ref } from "vue";
// import { useRouter } from "vue-router";
import Cart, { CourseType } from "@/api/cart.js";
import { alertDataType } from "@/components/AlertComponent.vue";

export interface CartType {
  _id: string;
  ownerId: string;
  courses: CourseType[];
  totalPrice: number;
  discountedPrice: number;
}
export const useCartStore = defineStore("cart", () => {
  const alertData = inject<Ref<alertDataType>>("alertData")!;

  const totalPrice = ref(0);
  const couponPrice = ref(0);
  const discountedPrice = ref(0);
  const cartData = ref<CourseType[]>([]);
  const youMightLike = ref<CourseType[]>([]);
  const visitorCartIds = ref<string[]>([]);
  async function getCartData() {
    if (localStorage.getItem("accessToken")) {
      const { data } = await Cart.apiGetCartData();
      console.log("getCartData", data);

      if (data.value?.isSuccess) {
        cartData.value = data.value.data?.courses || [];
        totalPrice.value = data.value.data?.totalPrice || 0;
        discountedPrice.value = data.value.data?.discountedPrice || 0;
      }
    }
  }
  async function addCart(id: CourseType["_id"]) {
    if (localStorage.getItem("accessToken")) {
      const { data } = await Cart.apiPostCartData(id);
      console.log("addCart", data);
      if (data.value?.isSuccess) {
        getCartData();
        alertData.value = {
          status: data.value?.isSuccess ? "success" : "error",
          content: data.value?.message ?? "",
          visible: true,
        };
      }
    }
  }
  async function deleteCart(id: CourseType["_id"]) {
    if (localStorage.getItem("accessToken")) {
      const { data } = await Cart.apiDeleteCartData(id);
      console.log("deleteCart", data);

      if (data.value?.isSuccess) {
        getCartData();
        alertData.value = {
          status: data.value?.isSuccess ? "success" : "error",
          content: data.value?.message ?? "",
          visible: true,
        };
      }
    }
  }

  return {
    cartData,
    youMightLike,
    totalPrice,
    visitorCartIds,
    couponPrice,
    discountedPrice,
    getCartData,
    addCart,
    deleteCart,
  };
});
