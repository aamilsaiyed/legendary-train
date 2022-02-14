import React from 'react';
import { Activity } from "../models/Activity";
import ActivityContext, { ActivityContextInterface } from './activity-context';

export default class ActivityManager extends React.Component {
  state: ActivityContextInterface = {
    modalActive: false,
    activities: [],
    favoriteActivities: [],
    updateActivities: (activities: Activity[]): void => {
      this.setState({ activities });
    },
    updateFavoriteActivities: (favoriteActivities: Activity[]): void => {
      this.setState({ favoriteActivities });
    },
    showModal: (modalActive: boolean): void => {
      this.setState({ modalActive });
    }
  };

  componentDidMount() {
    this.state.updateActivities([]);
    this.state.updateFavoriteActivities([]);
  }

  render() {
    return (
      <ActivityContext.Provider value={this.state}>
        {this.props.children}
      </ActivityContext.Provider>
    );
  }
}

