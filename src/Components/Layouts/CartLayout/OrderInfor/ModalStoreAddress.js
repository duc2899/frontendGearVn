import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Input } from "@mui/material";
function ModalStoreAddress({ setOpen, open, data, setResultChoose }) {
  const [choose, setChoose] = useState(data.length);
  const handleOk = () => {
    setResultChoose(choose - 1);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="Danh sách địa chỉ"
      onCancel={handleCancel}
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          {data.length > 0 && (
            <button
              onClick={handleOk}
              className="bg-blue-500 rounded-md p-1 pl-2 pr-2 ml-3 text-white hover:opacity-70"
            >
              Ok
            </button>
          )}
        </>
      )}
    >
      {data.length > 0 ? (
        data.map((item) => (
          <label
            htmlFor={item.id}
            key={item.id}
            className="block cursor-pointer w-fit"
          >
            <input
              id={item.id}
              type="radio"
              onChange={() => setChoose(item.id)}
              checked={item.id === choose}
            />
            <span className="ml-2 font-medium">
              {item.userName +
                " | " +
                item.phoneNumber +
                " - " +
                item.address +
                ", " +
                item.ward.name +
                ", " +
                item.districts.name +
                ", " +
                item.city.name}
            </span>
          </label>
        ))
      ) : (
        <div>Bạn chưa có địa chỉ nào</div>
      )}
    </Modal>
  );
}

export default ModalStoreAddress;
