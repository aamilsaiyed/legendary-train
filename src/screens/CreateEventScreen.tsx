import React from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { Formik } from "formik";

import { CreateEventViewModel } from "../viewModels/CreateEventViewModel";
import withActivityContext from "../contexts/withActivityContext";
import { ActivityContextInterface } from "../contexts/activity-context";

interface Props {
  activityContext: ActivityContextInterface;
}


class CreateEventScreen extends React.Component<Props> {
  viewModel: CreateEventViewModel;

  constructor(props: Props) {
    super(props);

    this.viewModel = new CreateEventViewModel(props.activityContext);
  }


  render() {
    const { handleSubmission, initialValues } = this.viewModel;
    const { activityContext } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Create a new activity to add to your favorites</Text>
        <Formik
          initialValues={initialValues}
          validate={values => {
            const errors: { activity?: string; isNotRobot?: string } = {};
            
            if (!values.isNotRobot) {
              errors.isNotRobot = "Robots cannot create activities";
            }

            if (values.activity == "") {
              errors.activity = "You have to type something to create an activity";
            }
            return errors;
          }}
          onSubmit={handleSubmission}
        >
          {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
            <View>
              <TextInput style={styles.inputBox} onChangeText={handleChange("activity")} value={values.activity} />
              <View style={styles.formField}>
                <Text style={styles.formLabel}>I am not a robot</Text>
                <CheckBox onValueChange={nextValue => setFieldValue("isNotRobot", nextValue)} value={values.isNotRobot} />
              </View>
              <Button onPress={handleSubmit} title="Submit" />
              {!!errors.activity && !touched.activity && <Text style={styles.errorText}>{errors.activity}</Text>}
              {!!errors.isNotRobot && !touched.isNotRobot && <Text style={styles.errorText}>{errors.isNotRobot}</Text>}
            </View>
          )}
        </Formik>

        {/* Overlay Modal */}
        {activityContext.modalActive &&
          <View style={styles.overlay}>
            <View style={styles.modalTile}>
              <Text style={styles.headerText}>Activity Added</Text>
              <Button onPress={() => { activityContext.showModal(false) }} title="OK" />
            </View>
          </View>}
      </SafeAreaView>
    );
  }
}  

export default withActivityContext(CreateEventScreen);

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  errorText: {
    marginVertical: 10,
    color: "red"
  },
  headerText: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginBottom: 30
  },
  inputBox: {
    borderColor: "grey",
    borderWidth: 2
  },
  formField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  formLabel: {
    color: "black",
    fontSize: 14
  },
  modalTile: {
    backgroundColor: "#BBBBBB",
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 50
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});