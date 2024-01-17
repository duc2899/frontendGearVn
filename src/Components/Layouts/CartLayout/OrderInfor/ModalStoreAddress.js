import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { getAddressNoteService } from "../../../Services/AddressNoteServices/GetAddressNoteService";

function ModalStoreAddress({ setOpen, open, idUser, setResultChoose }) {
  const [data, setData] = useState([]);
  const [choose, setChoose] = useState(data.length);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getAddressNoteService(idUser);
      if (res.status === 200) {
        setData(res.data);
      }
    };
    fetchAPI();
  }, []);
  const handleOk = () => {
    const { id, ...result } = data[choose];
    setResultChoose(result);
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
        data.map((item, i) => (
          <label
            htmlFor={item.id}
            key={item.id}
            className="block cursor-pointer w-fit"
          >
            <input
              id={item.id}
              type="radio"
              onChange={() => setChoose(i)}
              checked={i === choose}
            />
            <span className="ml-2 font-medium">
              {item.nameCustomer +
                " | " +
                item.phoneNumber +
                " - " +
                item.homeAddress +
                ", " +
                item.ward.name +
                ", " +
                item.district.name +
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
