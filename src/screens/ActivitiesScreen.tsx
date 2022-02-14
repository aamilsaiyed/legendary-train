import React from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet
} from "react-native";

import { ActivitiesViewModel } from "../viewModels/ActivitesViewModel";
import ActivityCell from "../components/ActivityCell";
import withActivityContext from "../contexts/withActivityContext";
import { ActivityContextInterface } from "../contexts/activity-context";

interface Props {
  activityContext: ActivityContextInterface;
}

class ActivitiesScreen extends React.Component<Props> {
  viewModel: ActivitiesViewModel;
  
  constructor(props: Props) {
    super(props);
    this.viewModel = new ActivitiesViewModel(props.activityContext);
  }
  
  render() {
    const { refresh } = this.viewModel;
    const { activityContext } = this.props;
    return (<SafeAreaView style={styles.container}>
      <Button title="Refresh" onPress={refresh}></Button>
      <FlatList
        style={styles.listArea}
        data={activityContext.activities}
        renderItem={({ item }) => <ActivityCell activity={item} />}
        keyExtractor={(item, i) => `${item.key}_${i}`}
      />
    </SafeAreaView>);
  }
}

export default withActivityContext(ActivitiesScreen);

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  listArea: {
    marginBottom: 40
  }
});