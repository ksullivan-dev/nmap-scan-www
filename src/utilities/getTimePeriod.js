/* eslint-disable no-param-reassign */
import moment from 'moment';

const getTimePeriod = (start, end, timeUnit, unitAmount = 1) => {
  start = moment(start);
  end = moment(end);
  const now = start.clone();
  const arr = [];

  while (now.isSameOrBefore(end, timeUnit)) {
    arr.push(now.clone());
    now.add(unitAmount, timeUnit);
  }
  return arr;
};

export default getTimePeriod;
