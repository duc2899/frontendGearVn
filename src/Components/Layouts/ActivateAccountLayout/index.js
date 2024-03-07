import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { CheckVerifyCodeService } from "../../Services/AuthServices/CheckVerifyCodeService";

function ActivateAccountLayout() {
  const location = window.location.pathname.split("/");
  const [isShow, SetIsShow] = useState(false);
  useEffect(() => {
    CheckVerifyCodeService({ code: location[2] }).then((d) => {
      if (d.status === 200) {
        SetIsShow(true);
      }
    });
  }, []);
  return (
    <div>
      {isShow ? (
        <Result
          className="h-96"
          status="success"
          title="Kích hoạt tài khoản thành công"
          extra={[
            <button className="bg-blue-500 p-2 rounded-md text-white">
              Trang chủ
            </button>,
          ]}
        />
      ) : (
        <Result
          status="404"
          title="Tài khoản không tồn tại"
          extra={[
            <button className="bg-blue-500 p-2 rounded-md text-white">
              Trang chủ
            </button>,
          ]}
        />
      )}
    </div>
  );
}

export default ActivateAccountLayout;
