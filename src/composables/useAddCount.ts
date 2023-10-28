export const useAddCount = () => {
  const count = ref(0);
  const add = () => {
    count.value++;
  };
  return {
    add,
    count,
  };
};
