import React, { useState } from "react";
import './App.css';


function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showMenu, setShowMenu] = useState(false)

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(0);
  const [updatedText, setUpdatedText] = useState("");

  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  /* Dodawanie nowego elementu*/
  function addItem() {
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);

    setNewItem("");
  }

  /* Usuwanie elementu */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function editItem(id, newText) {
    const currentItem = items.filter((item) => item.id === id);

    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  return (
    <div>
      <header>
        <button type="button" className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          CRUD Menu
        </button>
        {showMenu && 
          <nav>
            <ul>
              <li>
                <ul>
                  <li>
                    <a onClick={() => handleMenuClick("create")} className="crud-btn">Create</a>
                  </li>
                  <li>
                    <a onClick={() => handleMenuClick("read")} className="crud-btn">Read</a>
                  </li>
                  <li>
                    <a onClick={() => handleMenuClick("update")} className="crud-btn">Update</a>
                  </li>
                  <li>
                    <a onClick={() => handleMenuClick("delete")} className="crud-btn">Delete</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>}
      </header>
      <div className="app">
      {}
      <h1>Lista z elementami CRUD</h1>

      {}
      <input type="text" placeholder="Dodaj nowy element" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="add-input"/>

      <button onClick={() => addItem()} className="add-btn">Dodaj</button>

      <ul className={currentPage === "create" ? "display-none" : null}>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className={currentPage === "delete" ? "delete-btn" : "display-none"}
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </li>
              <div className={currentPage === "update" ? null : "display-none"}>
                  <input type="text" value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} className="update-input"/>
                  <button onClick={() => editItem(item.id, updatedText)} className="update-btn">
                    Zmień
                  </button>
                </div>
            </div>
          );
        })}
      </ul>
    </div>
    </div>
  );
}

export default App;