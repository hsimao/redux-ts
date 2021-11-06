import React, { useState, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addShop, removeShop, selectShop, fetchShopAsync } from "./shopSlice";
import {
  selectCount,
  increment as incrementCounter
} from "../counter/counterSlice";

export function Shop() {
  const shop = useAppSelector(selectShop);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddShop = () => {
    const shopData = {
      id: shop.items.length + 1,
      name
    };
    dispatch(addShop(shopData));
    dispatch(incrementCounter());
    setName("");
  };

  return (
    <div>
      <h1>Shop {count}</h1>
      <h2>status: {shop.status}</h2>
      <ul>
        {shop.items.map((item) => (
          <li key={item.id} onClick={() => dispatch(removeShop(item))}>
            {item.id} - {item.name}
          </li>
        ))}
      </ul>

      <input type="text" value={name} onChange={updateName} />
      <button onClick={handleAddShop}>Add Shop</button>
      <div>
        <button onClick={() => dispatch(fetchShopAsync())}>
          fetchShopAsync
        </button>
      </div>
    </div>
  );
}
