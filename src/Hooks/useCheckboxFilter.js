import { useState } from "react";

const useCheckboxFilter = (initialState, menuItems) => {
  const [isChecked, setIsChecked] = useState(initialState);
  const [categories, setCategories] = useState(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      const categoriesWithVegItems = menuItems.map((category) => ({
        ...category,
        itemCards: category.itemCards
          .filter(
            (card) => card.card?.info?.itemAttribute?.vegClassifier === "VEG"
          )
          .map((card) => ({
            ...card,
            card: {
              ...card.card,
              info: {
                ...card.card.info,
              },
            },
          })),
      }));

      setCategories(categoriesWithVegItems);
    } else {
      setCategories(menuItems);
    }
  };

  return {
    isChecked,
    categories,
    handleCheckboxChange,
  };
};

export default useCheckboxFilter;
