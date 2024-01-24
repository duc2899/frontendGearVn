import React, { useEffect, useState } from "react";
import ModalAddress from "./ModalAddress";
import { Popconfirm } from "antd";
import { getAddressNoteService } from "../../../Services/AddressNoteServices/GetAddressNoteService";
import { deleteAddressNoteService } from "../../../Services/AddressNoteServices/DeleteAddressNoteService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressNote({ idUser }) {
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    isEdit: false,
  });
  const [edit, setEdit] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getAddressNoteService(idUser);
      setData(res.data);
    };
    fetchAPI();
  }, []);
  const handelEdit = (i) => {
    setEdit(i);
    setOpenModal({
      isOpen: true,
      isEdit: true,
    });
  };
  const confirm = async (id) => {
    const res = await deleteAddressNoteService({
      idUser: idUser,
      idAddress: id,
    });
    if (res.status === 200) {
      const fetchAPI = async () => {
        const res = await getAddressNoteService(idUser);
        setData(res.data);
        toast.success("Xóa địa chỉ thành công");
      };
      fetchAPI();
    } else {
      toast.error(res.message);
    }
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
        {data.map((item, i) => (
          <div key={i} className="my-6 ">
            <div className="flex items-center justify-between">
              <div>
                <span className="mr-1 font-semibold">{item.nameCustomer}</span>|
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
                  onConfirm={() => confirm(item.id)}
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
              {item.homeAddress +
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
                dataEdit={data[edit]}
                idUser={idUser}
                setData={setData}
              ></ModalAddress>
            )}
          </div>
        ))}
      </div>
      {openModal.isOpen && !openModal.isEdit && (
        <ModalAddress
          open={openModal}
          setOpen={setOpenModal}
          idUser={idUser}
          setData={setData}
        ></ModalAddress>
      )}
    </div>
  );
}

export default AddressNote;
