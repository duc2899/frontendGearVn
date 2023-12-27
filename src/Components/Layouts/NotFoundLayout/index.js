import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

function NotFoundLayout() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, Không thể tìm thấy trang này"
      extra={
        <Link
          to={"/"}
          className="p-2 rounded-md bg-blue-500 text-white hover:opacity-70 transition-all"
        >
          Quay về trang chủ
        </Link>
      }
    />
  );
}

export default NotFoundLayout;
