import React, { useState } from "react";
import ModalAddress from "./ModalAddress";
import { message, Popconfirm } from "antd";

function AddressNote({ Data }) {
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    isEdit: false,
  });
  const [edit, setEdit] = useState(0);

  const handelEdit = (i) => {
    setEdit(i);
    setOpenModal({
      isOpen: true,
      isEdit: true,
    });
  };
  const confirm = (index) => {
    console.log(index);
    message.success("Click on Yes");
  };
  return (
    <div className="bg-white rounded-md p-4 w-3/4 max-sm:w-full min-h-96">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-semibold text-2xl">Sổ địa chỉ</h2>
        <button
          onClick={() =>
            setOpenModal({
              isOpen: true,
              isEdit: false,
            })
          }
          className="flex items-center justify-evenly bg-blue-500 text-white p-2 rounded-md text-sm font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Thêm địa chỉ mới
        </button>
      </div>
      <div>
        {Data.addressNotes?.map((item, i) => (
          <div key={i} className="my-6 ">
            <div className="flex items-center justify-between">
              <div>
                <span className="mr-1 font-semibold">{item.userName}</span>|
                <span className="ml-1">{item.phoneNumber}</span>
              </div>
              <div>
                <button
                  onClick={() => handelEdit(i)}
                  className="bg-green-500 font-medium p-1.5 text-sm text-white rounded-md"
                >
                  Cập nhật
                </button>
                <Popconfirm
                  title="Xóa địa chỉ này"
                  description="Bạn có chắc bạn muốn xóa địa chỉ này?"
                  onConfirm={() => confirm(i)}
                  okText="Xóa"
                  cancelText="Không"
                >
                  <button className="bg-red-500 font-medium p-1.5 text-sm ml-1 text-white rounded-md">
                    Xóa
                  </button>
                </Popconfirm>
              </div>
            </div>
            <div>
              {item.address +
                ", " +
                item.ward.name +
                ", " +
                item.district.name +
                ", " +
                item.city.name}
            </div>
            {openModal.isOpen && openModal.isEdit && edit === i && (
              <ModalAddress
                open={openModal}
                setOpen={setOpenModal}
                data={Data.addressNotes[edit]}
              ></ModalAddress>
            )}
          </div>
        ))}
      </div>
      {openModal.isOpen && !openModal.isEdit && (
        <ModalAddress open={openModal} setOpen={setOpenModal}></ModalAddress>
      )}
    </div>
  );
}

export default AddressNote;
