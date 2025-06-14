import { CallFramContentType } from "../../types";

export const getInitialVideoStreamsForTwoUsers = (): CallFramContentType[] => {
  return [
    {
      id: 0,
      content: "placeHolder",
    },
    {
      id: 1,
      content: "illustration",
    },
  ]
}