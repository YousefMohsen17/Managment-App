import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";
export default function ModalWindow({ ref, onOk }) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      ref={dialog}
    >
      <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
      <p className="text-stone-600 mb-4">
        Oops ... looks like you forgot to enter a value.
      </p>
      <p className="text-stone-600 mb-4">
        Please make sure you provide a valid value for every input field.
      </p>
      <form method="dialog" className="mt-4 text-right">
        <button
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={onOk}
        >
          Okay
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}
