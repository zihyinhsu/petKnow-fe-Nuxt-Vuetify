import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import CartComponent from "@/components/CartComponent.vue";

describe("CartComponent", () => {
  const pinia = createPinia();
  it("元件與 props 是否有正確渲染", () => {
    const wrapper = shallowMount(CartComponent, {
      global: {
        plugins: [pinia],
      },
      propsData: {
        imageUrl:
          "https://assets-global.website-files.com/60d196db74a1e36ff16ebd5d/63c117f19e248b737369b165_puppy-g3237d6104_1920.jpg",
        level: "初級",
        title: "狗狗的健康生活",
        teacher: "Mary",
        time: 24,
        price: 2300,
        courseNum: 20,
        discountPrice: 2000,
        id: "test",
        tagNames: ["狗狗"],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
