import ChangePassword from "./ChangePassword";
import InforAccount from "./InforAccount";

function AccountInfo({ Data, setReload }) {
  return (
    <div className="bg-white rounded-md p-4 w-3/4 max-sm:w-full min-h-96 grid lg:grid-cols-2 grid-cols-1 gap-9">
      <InforAccount Data={Data} setReload={setReload}></InforAccount>
      <ChangePassword Data={Data}></ChangePassword>
    </div>
  );
}

export default AccountInfo;
