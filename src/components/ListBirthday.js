import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import moment from "moment";
import AddBirtday from "./AddBirtday";
import ActionBar from "./ActionBar";
import Birthday from "./Birthday";
import firebase from "../utils/firebase";
import "firebase/firestore";

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);

export default function Listbirthday(props) {
  const { user } = props;
  const [showList, setShowList] = useState(true);
  const [birthday, setBirthday] = useState([]);
  const [pasaBirthday, setPasaBirthday] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  console.log(birthday);

  useEffect(() => {
    setBirthday([]);
    setPasaBirthday([]);
    db.collection(user.uid)
      .orderBy("dateBirth", "asc")
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
      });
    setReloadData(false);
  }, [reloadData]);

  const formatData = (items) => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      milliseconds: 0,
    });
    const birthdayTempArray = [];
    const pasaBirthdayTempArray = [];

    items.forEach((item) => {
      const dateBirth = new Date(item.dateBirth.seconds * 1000);
      const dateBrithday = moment(dateBirth);
      const currentYear = moment().get("year");
      dateBrithday.set({ year: currentYear });

      const diffDate = currentDate.diff(dateBrithday, "days");
      const itemTemp = item;
      itemTemp.dateBirth = dateBrithday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        birthdayTempArray.push(itemTemp);
      } else {
        pasaBirthdayTempArray.push(itemTemp);
      }
      // console.log(birthdayTempArray);
      // console.log(pasaBirthdayTempArray);
    });
    setBirthday(birthdayTempArray);
    setPasaBirthday(pasaBirthdayTempArray);
  };
  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthday.map((item, index) => (
            <Birthday key={index} birthday={item} />
          ))}
          {pasaBirthday.map((item, index) => (
            <Birthday key={index} birthday={item} />
          ))}
        </ScrollView>
      ) : (
        <AddBirtday user={user} setShowList={setShowList} setReloadData={setReloadData} />
      )}

      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  scrollView: {
    marginBottom: 50,
    width: "100%",
  },
});
