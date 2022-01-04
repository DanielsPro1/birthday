import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  LogBox,
  StatusBar,
  SafeAreaView, 
 
} from "react-native";
import { decode, encode} from "base-64";
import firebase from "./src/utils/firebase";
import Auth from "./src/components/Auth";
import "firebase/auth";
import ListBirthday from "./src/components/ListBirthday";

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;
LogBox.ignoreAllLogs()


export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="ligth-content" />
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user}/> : <Auth />}
      </SafeAreaView>
    </>
  );
}



const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "#15212b",
  },
  
});
