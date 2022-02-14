import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet
} from "react-native";

import withActivityContext from "../contexts/withActivityContext";
import { ActivityContextInterface } from "../contexts/activity-context";
import ActivityCell from "../components/ActivityCell";

interface Props {
  activityContext: ActivityContextInterface;
}

class MyEventsScreen extends React.Component<Props> {
  render() {
    const { activityContext } = this.props;
    return (<SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listArea}
        data={activityContext.favoriteActivities}
        renderItem={({ item }) => <ActivityCell activity={item} />}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>);
  }
}

export default withActivityContext(MyEventsScreen);

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  listArea: {
    marginBottom: 40
  }
});
