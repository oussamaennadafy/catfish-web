import { CallFramContentType } from "../../types";

export const getInitialVideoStreamsForMoreThanThree = (): CallFramContentType[] => {
  return [
    {
      id: 0,
      content: "placeHolder"
    },
    {
      id: 1,
      content: "illustration"
    },
    {
      id: 2,
      content: "illustration"
    },
    {
      id: 3,
      content: "illustration"
    },
  ];
}