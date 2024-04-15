import { CartType } from "@/stores/cart";

export interface CourseType {
  _id: string;
  title: string;
  shortDescription: string;
  cover: string;
  level: string;
  time: number;
  total: number;
  instructorName: string;
  price: number;
  discountPrice: number;
  isFree: boolean;
  tagNames: string[];
}

const cart = {
  apiGetCartData() {
    return useHttp.get<CartType>("/cart");
  },
  apiPostCartData(id: string) {
    return useHttp.post(`/cart?id=${id}`);
  },
  apiDeleteCartData(id: string) {
    return useHttp.delete(`/cart/${id}`);
  },
};

export default cart;
