import { useState } from "react";
import AddItemModal from "./AddItemModal";
import Backdrop from "./Backdrop";

const SimpleList = ({ items, addItem, changeFormSubmitState }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const addItemHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const deleteItemHandler = (e) => {
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
                  {/* TODO: EDIT Logic */}
                  <span className="hover:bg-gray-100 p-2 text-green-400 hover:text-green-600 cursor-pointer">
                    Edit
                  </span>
                  {/* TODO: DELETE Logic */}
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
      {modalIsOpen && (
        <AddItemModal
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
          onClick={closeModalHandler}
          addItem={addItem}
        />
      )}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
};

export default SimpleList;
