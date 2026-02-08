export function changeWatherType(weaterType: string) {
  switch (weaterType) {
    case "clear":
      return "晴れ"
    case "cloudy":
      return "曇り"
    case "rain":
      return "雨"
    case "snow":
      return "雪"
  }
}