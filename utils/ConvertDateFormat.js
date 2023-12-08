export default function ConvertDateFormat(date) {
  if (date.length > 0) {
    const dateSplit = date.split("T")[0];
    const dateSplit2 = dateSplit.split("-");

    [dateSplit2[0], dateSplit2[1], dateSplit2[2]] = [
      dateSplit2[2],
      dateSplit2[1],
      dateSplit2[0],
    ];
    return dateSplit2.join("/");
  }
  return "";
}

export function ConvertDay(day) {
  if (day === "Mondays") {
    return "Lundi";
  } else if (day === "Tuesdays") {
    return "Mardi";
  } else if (day === "Wednesdays") {
    return "Mercredi";
  } else if (day === "Thursdays") {
    return "Jeudi";
  } else if (day === "Fridays") {
    return "Vendredi";
  } else if (day === "Saturdays") {
    return "Samedi";
  } else {
    return "Dimanche";
  }
}
