import { useRef } from "react";

const Modal = (props) => {
  const nameInputRef = useRef();
  const quantityInputRef = useRef();
  const locationInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;

    const itemData = {
      name: enteredName,
      quantity: enteredQuantity,
      location: enteredLocation,
    };

    props.addItem(itemData);
  };

  return (
    <div
      className="min-w-screen h-screen overflow-x-hidden overflow-y-auto fixed  my-auto inset-0 z-50 outline-none focus:outline-none  items-center flex justify-center"
      id="modal-id"
    >
      <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <form className="p-5">
          <div className="flex flex-col justify-center">
            <div className="text-gray-700 md:flex md:items-center mt-5">
              <div className="text-left mb-1 ml-2 md:mb-0 md:w-1/3">
                <label htmlFor="itemId">Item Name</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <input
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  id="itemId"
                  ref={nameInputRef}
                  required
                />
              </div>
            </div>
            <div className="text-gray-700 md:flex md:items-center mt-5">
              <div className="text-left mb-1 ml-2 md:mb-0 md:w-1/3">
                <label htmlFor="itemQty">Quantity</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <input
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  id="itemQty"
                  ref={quantityInputRef}
                  required
                />
              </div>
            </div>
            <div className="text-gray-700 md:flex md:items-center mt-5">
              <div className="text-left mb-1 ml-2 md:mb-0 md:w-1/3">
                <label htmlFor="itemId">Location</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <input
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  id="itemLocation"
                  ref={locationInputRef}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center mt-10 text-right">
            <button
              className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
              onClick={handleSubmit}
            >
              Add Item
            </button>
            <button className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">
              Reset Form
            </button>
            <button
              className="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800"
              onClick={props.onClick}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
