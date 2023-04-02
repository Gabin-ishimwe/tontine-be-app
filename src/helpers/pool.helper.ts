import { TimeType } from 'src/pool/dto/create-pool.dto';

// max. number of days in weeks = 7
// max. number of days in month = 28

// days computation
// 1 - 7 days

// weeks computation
// 1.1 weeks => 1 week 1 day
// 1.2 weeks => 1 week 2 days
// 1.3 weeks => 1 week 3 days
// 1.4 weeks => 1 week 4 days
// 1.5 weeks => 1 week 5 days
// 1.6 weeks => 1 week 6 days
// 1.7 weeks => 1 week 7 days => 2 weeks
// 1.8 weeks => 2 weeks 1 day
// 1.9 weeks => 2 weeks 2 days

// months computation
// 1.1 months => 1 month 1 week
// 1.2 months => 1 month 2 weeks
// 1.3 months => 1 month 3 weeks
// 1.4 months => 1 month 4 weeks => 2 months
// 1.5 months => 2 months 1 week

type ComputeCycleTime = {
  sprintTime: number;
  sprintTimeType: TimeType;
  numberOfParticipants: number;
};

type ComputationResult = {
  cycleTime: number;
  cycleTimeType: TimeType;
};

export const computeCycleTime = (
  compute: ComputeCycleTime,
): ComputationResult => {
  const { sprintTime, sprintTimeType, numberOfParticipants } = compute;
  let cycleTime;
  let cycleTimeType;
  switch (sprintTimeType) {
    case TimeType.DAYS: // 1
      cycleTime = sprintTime * numberOfParticipants;
      if (cycleTime >= 7 && cycleTime <= 28) {
        cycleTimeType = TimeType.WEEKS;
        // change cycle from days to weeks
        cycleTime = Math.round((cycleTime / 7) * 10) / 10;
      } else if (cycleTime >= 28) {
        // change cycle time from days to months
        cycleTimeType = TimeType.MONTHS;
        cycleTime = Math.round((cycleTime / 28) * 10) / 10;
      } else {
        cycleTimeType = TimeType.DAYS;
      }
      break;

    case TimeType.WEEKS:
      cycleTime = sprintTime * numberOfParticipants;
      if (cycleTime > 4) {
        cycleTimeType = TimeType.MONTHS;
        // change cycle time from weeks to months
        cycleTime = Math.round((cycleTime / 4) * 10) / 10;
      } else {
        cycleTimeType = TimeType.WEEKS;
      }
      break;

    // TODO: revise this logic on cycle time of months
    // case TimeType.MONTHS:
    //   cycleTime = sprintTime * numberOfParticipants;
    //   if (cycleTime > 12) {
    //     cycleTime = null;
    //     cycleTimeType = null;
    //   } else {
    //     cycleTimeType = TimeType.MONTHS;
    //   }
    //   break;
  }

  return {
    cycleTime,
    cycleTimeType,
  };
};
