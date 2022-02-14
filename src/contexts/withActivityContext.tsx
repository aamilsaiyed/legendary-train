import React from 'react';
import ActivityContext, { ActivityContextInterface } from './activity-context';
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default function withActivityContext<
  P extends { activityContext?: ActivityContextInterface },
  R = Omit<P, "activityContext">
>(Component: React.ComponentClass<P> | React.FC<P>): React.FC<R> {
  return function BoundComponent(props: any) {
    return (
      <ActivityContext.Consumer>
        {ctx => <Component {...props as any} activityContext={ctx} />}
      </ActivityContext.Consumer>
    );
  };
}