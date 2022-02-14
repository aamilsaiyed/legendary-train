import React from 'react';
import { Activity } from "../models/Activity";

export interface ActivityContextInterface {
  modalActive: boolean;
  activities: Activity[];
  favoriteActivities: Activity[];
  updateActivities: (activities: Activity[]) => void;
  updateFavoriteActivities: (activities: Activity[]) => void;
  showModal: (modalActive: boolean) => void;
}

const ActivityContext = React.createContext<ActivityContextInterface | null>(null);

export default ActivityContext;