import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function onRemoveItem(itemToRemove) {
    const newItems = items.filter((item) => {
      return item !== itemToRemove;
    });
    setItems(newItems);
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.item;
    const newItems = [...items, input.value];
    setItems(newItems);
    form.reset();
  }

  return (
    <>
      <h1>Shopping List</h1>
      <div className="shopping-list">
        <h2>Items To Buy</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="item"
            placeholder="Add a new item"
            required
          />
          <button>Add</button>
        </form>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
            {item}
            <button className="delete" onClick={() => onRemoveItem(item)}>
              x
            </button>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
}
