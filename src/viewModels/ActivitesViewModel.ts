import { Activity } from "../models/Activity";
import { BoredAPIResult } from "../models/BoredAPIResult";
import { ActivityContextInterface } from "../contexts/activity-context";

const API_URL: string = "https://www.boredapi.com/api/activity/";
const RESULT_SIZE: number = 10;

async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request, { method: "GET" })
  return await response.json()
}

export class ActivitiesViewModel {
  activityCtx: ActivityContextInterface

  constructor(activityCtx: ActivityContextInterface) {
    this.activityCtx = activityCtx;
    this.refresh();
  }

  refresh = async (): Promise<void> => {
    this.activityCtx.updateActivities([]);

    const newActivities: Activity[] = [];
    for (let i = 0; i < RESULT_SIZE; i++) {
      const apiResult: BoredAPIResult = await http<BoredAPIResult>(API_URL);

      const newActivity: Activity = {
        key: apiResult.key,
        activity: apiResult.activity
      }
      newActivities.push(newActivity);
    }
    this.activityCtx.updateActivities(newActivities);
  }
}