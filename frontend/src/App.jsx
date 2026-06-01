import { Outlet } from "react-router-dom";

import Header from "./components/layout/header";

import {
  useContext,
  useEffect,
} from "react";

import { Spin } from "antd";

import {
  AuthContext
} from "./components/context/auth.context";

import {
  getUserApi
} from "./util/api";

function App() {

  const {
    setAuth,
    appLoading,
    setAppLoading
  } = useContext(AuthContext);

  useEffect(() => {

    const fetchAccount =
      async () => {

        try {

          setAppLoading(true);

          const res =
            await getUserApi();

          // API SUCCESS
          if (
            res &&
            res.EC === 0
          ) {

            setAuth({

              isAuthenticated: true,

              user: {

                email:
                  res?.data?.email,

                name:
                  res?.data?.name,
                
                role:
                  res?.data?.role ?? "user",
              },
            });

            localStorage.setItem("user_role", res?.data?.role ?? "user");

          } else {

            setAuth({

              isAuthenticated: false,

              user: null
            });
          }

        } catch (error) {

          console.log(error);

          setAuth({

            isAuthenticated: false,

            user: null
          });

        } finally {

          setAppLoading(false);
        }
      };

    fetchAccount();

  }, []);

  // LOADING
  if (appLoading) {

    return (

      <div className="
        h-screen
        flex
        items-center
        justify-center
      ">

        <Spin size="large" />

      </div>
    );
  }

  return (

    <div className="
      min-h-screen
      bg-[#f5f5f5]
    ">

      <Header />

      <main className="
        max-w-[1600px]
        mx-auto
      ">

        <Outlet />

      </main>

    </div>
  );
}

export default App;