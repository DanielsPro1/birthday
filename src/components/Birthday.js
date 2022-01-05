import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Birthday(props) {
  const { birthday } = props;
  const pasat = birthday.days > 0 ? true : false;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat
          ? styles.pasat
          : birthday.days === 0
          ? styles.actual
          : styles.current,
      ]}>
      <Text>
        {birthday.name} {birthday.lastname}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
},
  actual: {
      backgroundColor: "#559204"

  },
  current: {
    backgroundColor: "#1ea1f2",
  },
  pasat: {
    backgroundColor: "#820000",
  },

});
