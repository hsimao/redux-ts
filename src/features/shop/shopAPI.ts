// A mock function to mimic making an async request for data
import { ShopItem } from "./shopSlice";

const fakeShopItems: ShopItem[] = [
  { id: 1, name: "item1" },
  { id: 2, name: "item2" },
  { id: 3, name: "item3" }
];

export function fetchShop() {
  return new Promise<{ data: { items: ShopItem[] } }>((resolve) =>
    setTimeout(() => resolve({ data: { items: fakeShopItems } }), 2000)
  );
}
