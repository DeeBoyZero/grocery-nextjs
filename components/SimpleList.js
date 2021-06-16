import { useState } from "react";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import Backdrop from "./Backdrop";

const SimpleList = ({ items, addItem, editItem, changeFormSubmitState }) => {
  const [AddModalIsOpen, setAddModalIsOpen] = useState(false);
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const addItemHandler = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModalHandler = () => {
    setAddModalIsOpen(false);
  };

  const closeEditModalHandler = () => {
    setEditModalIsOpen(false);
  };

  const deleteItemHandler = (e) => {
    e.preventDefault();
    const item = {
      itemId: e.target.parentElement.parentElement.dataset.id,
    };

    if (confirm("Are you sure you want to delete this item?")) {
      fetch("/api/items", {
        method: "DELETE",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(changeFormSubmitState(true))
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const editItemHandler = (e) => {
    e.preventDefault();

    const itemId = String(e.target.parentElement.parentElement.dataset.id);
    fetch(`/api/item/${itemId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((jsonData) => setCurrentItem(jsonData))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setEditModalIsOpen(true);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 text-sm md:text-lg">
      <div className="flex">
        <button className="btn" onClick={addItemHandler}>
          Add an item
        </button>
      </div>
      <table className="w-3/4 my-5">
        <thead className="text-black">
          <tr className="bg-blue-300 flexflex-row rounded-l-lg mb-2">
            <th className="p-3 text-left">Item Name</th>
            <th className="p-3 text-left">QTY</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left" width="110px">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {items.map((item, index) => {
            return (
              <tr
                key={index}
                data-id={item._id}
                className="bg-gray-300 text-black"
              >
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  {item.name}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  {item.quantity}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  {item.location}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  <span
                    onClick={editItemHandler}
                    className="hover:bg-gray-100 p-2 text-green-400 hover:text-green-600 cursor-pointer"
                  >
                    Edit
                  </span>
                  <span
                    onClick={deleteItemHandler}
                    className="hover:bg-gray-100 p-2 text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="flex mb-5">
        <button className="btn" onClick={addItemHandler}>
          Add an item
        </button>
      </div> */}
      {AddModalIsOpen && (
        <AddItemModal onClick={closeAddModalHandler} addItem={addItem} />
      )}
      {AddModalIsOpen && <Backdrop onClick={closeAddModalHandler} />}

      {EditModalIsOpen && (
        <EditItemModal
          onClick={closeEditModalHandler}
          editItem={editItem}
          currentItem={currentItem}
        />
      )}
      {EditModalIsOpen && <Backdrop onClick={closeEditModalHandler} />}
    </div>
  );
};

export default SimpleList;
