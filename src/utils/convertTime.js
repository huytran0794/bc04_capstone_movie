import moment from "moment";
import { TIME_FORMAT_CONST } from "../UserView/constants/time.const";

const convertTime = (timeString, timeFormat) =>
  moment(timeString).format(timeFormat);

const convertTimeOnlyYear = (timeString) =>
  convertTime(timeString, TIME_FORMAT_CONST.ONLY_YEAR_FORMAT);

const convertTimeMovieFormat = (timeString) =>
  convertTime(timeString, TIME_FORMAT_CONST.FULL_TIME_MOVIE_FORMAT);

export { convertTimeOnlyYear, convertTimeMovieFormat };
