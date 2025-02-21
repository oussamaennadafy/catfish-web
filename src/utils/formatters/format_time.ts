export function formateSecondesToString(seconds: number): string {
  let hourse =  Math.floor((seconds / (60 * 60))).toString();
  let minuts = (Math.floor((seconds / 60)) % 60).toString();
  let resultsSeconds = (seconds % 60).toString();

  if (hourse.length <= 1) {
    hourse = `0${hourse}`;
  }
  if (minuts.length <= 1) {
    minuts = `0${minuts}`;
  }
  if (resultsSeconds.length <= 1) {
    resultsSeconds = `0${resultsSeconds}`;
  }

  if(hourse === "00") return `${minuts}:${resultsSeconds}`;
  else return `${hourse}:${minuts}:${resultsSeconds}`;
}
