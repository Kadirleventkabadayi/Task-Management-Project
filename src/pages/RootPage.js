import { Outlet } from "react-router-dom";

function RootPage() {
  return (
    <>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
export default RootPage;
