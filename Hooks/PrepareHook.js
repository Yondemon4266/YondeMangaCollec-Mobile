import { useEffect, useState } from "react";
import lm from "../assets/fonts/Literata-Medium.ttf";
import lr from "../assets/fonts/Literata-Regular.ttf";
import lsb from "../assets/fonts/Literata-SemiBold.ttf";
import * as Font from "expo-font";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authReducer, getUserId, putUserData } from "../Redux/UserSlice";
import { getAllUsers } from "../Redux/AllUsersSlice";

export default function Preparation() {
  const isLogged = useSelector((state) => state.User.isLogged);
  const [appIsReady, setAppIsReady] = useState(false);
  const [userId, setUserId] = useState("p");
  const dispatch = useDispatch();
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Literata-Medium": lm,
          "Literata-SemiBold": lsb,
          "Literata-Regular": lr,
        });
        const loginResponse = await axios({
          method: "get",
          url: `https://server-yondemangacollec.onrender.com/jwtid`,
          withCredentials: true,
        });
        if (loginResponse) {
          dispatch(authReducer(true));
          dispatch(getUserId(loginResponse.data));
          console.log("authentifié!");
          setUserId(loginResponse.data);
        }
      } catch (e) {
        dispatch(authReducer(false));
        console.log(
          "authUser",
          e.response?.data?.message || "auth une erreur s'est produite"
        );
        setUserId("p");
      }
    }

    async function prepare2() {
      try {
        const AllUsersDataResponse = await axios({
          method: "get",
          url: `https://server-yondemangacollec.onrender.com/api/user/`,
          withCredentials: true,
        });
        if (AllUsersDataResponse) {
          dispatch(getAllUsers(AllUsersDataResponse.data));
          console.log("succès réception données AllUsers");
        }
      } catch (e) {
        console.log(
          e.response?.data?.message || "AllUsersData une erreur s'est produite"
        );
        console.log("échec réception données AllUsers");
      }
    }
    async function prepare3() {
      try {
        const UserDataResponse = await axios({
          method: "get",
          url: `https://server-yondemangacollec.onrender.com/api/user/${userId}`,
        });
        if (UserDataResponse) {
          dispatch(putUserData(UserDataResponse.data));
          console.log("succès réception données de l'user");
        }
      } catch (e) {
        console.log(
          e.response?.data?.message || "UserData n'a pas pu être récupéré"
        );
        console.log("échec réception données de l'user");
      }
    }
    async function prepareData() {
      try {
        await prepare();
        if (isLogged && userId !== "p") {
          await Promise.all([prepare3(), prepare2()]);
        } else {
          dispatch(getAllUsers([]));
          dispatch(putUserData([]));
        }
      } catch (e) {
        console.error("Une erreur s'est produite lors des préparations", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepareData();
  }, [isLogged, userId]);

  return { appIsReady };
}



