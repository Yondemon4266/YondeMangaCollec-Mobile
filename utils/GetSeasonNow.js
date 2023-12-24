export default function GetSeasonNow(month) {
  if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 11) {
    return "fall";
  } else {
    return "winter";
  }
}

export function translateSeason(season) {
  if (season === "Printemps") {
    return "spring";
  } else if (season === "Été") {
    return "summer";
  } else if (season === "Automne") {
    return "fall";
  } else if (season === "Hiver") {
    return "winter";
  }
}


export function convertSeason(season) {
  if (season === "spring") {
    return "Printemps";
  } else if (season === "summer") {
    return "Été";
  } else if (season === "fall") {
    return "Automne";
  } else if (season === "winter") {
    return "Hiver";
  }
}