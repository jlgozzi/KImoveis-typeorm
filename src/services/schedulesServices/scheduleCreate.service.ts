import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Address } from "../../entities/address.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { SchedulesUserProperty } from "../../entities/schedules_user_properties.entity";
import ErrorHTTP from "../../errors/ErrorHTTP";
import jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity";

const scheduleCreateService = async (
  { userId, propertyId, date, hour }: any,
  authorization: any
): Promise<any> => {
  const token = authorization.split(" ")[1];

  const payload: any = jwt.verify(
    token,
    String(process.env.JWT_SECRET),
    (err: any, decoded: any) => {
      if (!decoded) {
        throw new ErrorHTTP("Not authorized.", 401);
      }
      return decoded;
    }
  );

  const user = payload.id;

  console.log(user);

  const schedulesDatabase = AppDataSource.getRepository(SchedulesUserProperty);
  const propertiesDatabase = AppDataSource.getRepository(Property);

  const dateStr = `${date} ${hour}:00`;

  const [dateRelated, timeRelated] = dateStr.split(" ");

  const [year, month, day] = dateRelated.split("/");
  const [hours, minutes, seconds] = timeRelated.split(":");

  const newDate = new Date(+year, +month, +day, +hours, +minutes, +seconds);

  if (!(newDate instanceof Date)) {
    throw new ErrorHTTP("Date not valid.", 400);
  }

  const weekDay = newDate.getDay();
  console.log(parseInt(hours));
  if (weekDay === 0 || weekDay === 6) {
    throw new ErrorHTTP("Closed.", 400);
  }

  if (parseInt(hours) < 8 || parseInt(hours) > 18) {
    throw new ErrorHTTP("Closed.", 400);
  }

  const findSchedule = await schedulesDatabase.find();
  const scheduleExists = findSchedule.find(
    (schedule) =>
      schedule.date.toString() == newDate.toString() || schedule.hour == hour
    //   property.property == propertyId
  );

  if (scheduleExists) {
    throw new ErrorHTTP("Schedule already exists.", 400);
  }

  const newSchedule = schedulesDatabase.create({
    property: propertyId,
    date: newDate,
    hour,
    user: user,
  });

  await schedulesDatabase.save(newSchedule);

  return { message: newSchedule };
};

export default scheduleCreateService;
