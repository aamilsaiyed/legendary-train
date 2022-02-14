import { Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import { ActivityContextInterface } from "../contexts/activity-context";
import { Activity } from "../models/Activity";
import { FormikHelpers } from "formik";


const FAVORITES_KEY = "BITH_favorites";

export interface FormValues {
  activity: string;
  isNotRobot: boolean;
}

export class CreateEventViewModel {
  activityCtx: ActivityContextInterface;

  constructor(activityCtx: ActivityContextInterface) {
    this.activityCtx = activityCtx;
  }

  initialValues: FormValues = {
    activity: "",
    isNotRobot: false
  }

  handleSubmission = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>): Promise<void> => {
    const key: string = `custom_${moment().format("DDMMYYYYHHmmss")}`;
    const { activity } = values;
    const customActivity: Activity = { activity, key };

    const favoritesString = await AsyncStorage.getItem(FAVORITES_KEY);
    let favorites: Activity[] = [];

    if (favoritesString != null) {
      favorites = JSON.parse(favoritesString);
    }

    favorites.push(customActivity);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    // update favorites in context
    this.activityCtx.updateFavoriteActivities(favorites);
    resetForm();
    Keyboard.dismiss();
    this.activityCtx.showModal(true);
  }
}