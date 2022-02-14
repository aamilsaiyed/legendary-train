import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { Activity } from "../models/Activity";

interface IActivityCellProps {
  activity: Activity;
}

const ActivityCell: React.FC<IActivityCellProps> = ({ activity }) =>
  <View style={styles.container}>
    <Text style={styles.activityText}>{activity.activity}</Text>
  </View>;

export default ActivityCell;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom: 10,
    borderColor: "black",
    borderBottomWidth: 2
  },
  activityText: {
    color: "black",
    fontSize: 20
  }
});