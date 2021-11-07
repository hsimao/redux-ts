import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
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
  console.log("12345");
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

  useEffect(() => {
    console.log("Shop render");
  });

  const [dark, setDark] = useState(false);

  // 物件放到依賴判斷還是會執行, 因為 {} != {} 如下
  // const a = {name: 'Hannah'};
  // const b = {name: 'Hannah'};
  // console.log(a === b); // false
  const themeStyle = {
    backgroundColor: dark ? "#2c3e50" : "#ecf0f1",
    color: dark ? "#ecf0f1" : "#2c3e50"
  };

  useEffect(() => {
    console.log("themeStyle effect");
  }, [themeStyle]);

  // 透過 useMemo 可以精準判斷物件值是否有改變
  const themeStyleWithMemo = useMemo(
    () => ({
      backgroundColor: dark ? "#2c3e50" : "#ecf0f1",
      color: dark ? "#ecf0f1" : "#2c3e50"
    }),
    [dark]
  );
  useEffect(() => {
    console.log("themeStyleWithMemo effect");
  }, [themeStyleWithMemo]);

  // 透過 useMemo, 監聽 shop 值有變化才執行重新渲染 ItemList
  const ItemList = useMemo(() => {
    console.log("ItemList render");
    return (
      <ul>
        {shop.items.map((item) => (
          <li key={item.id} onClick={() => dispatch(removeShop(item))}>
            {item.id} - {item.name}
          </li>
        ))}
      </ul>
    );
  }, [shop]);

  return (
    <div>
      <h1>Shop {count}</h1>
      <h2>status: {shop.status}</h2>
      {ItemList}

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
