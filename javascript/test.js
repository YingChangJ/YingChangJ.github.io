import * as Astronomy from "./astronomy-engine.js";
import { DateTime } from "./luxon.js";

const result1 = [];
for (let i = 0; i < 600; i++) {
  const t = new Astronomy.AstroTime(-36524.5 + i * 90);
  const l = Astronomy.Libration(t);
  result1.push([
    l.elon,
    l.elat,
    l.dist_km,
    l.sub_sun_lon,
    l.sub_sun_lat,
    l.position_angle_axis,
  ]);
}
// let result2 = null;
// fetch("http://localhost:5000/api/moonList", {
//   method: "POST", // 指定请求方法为POST
//   headers: {
//     "Content-Type": "application/json", // 指定请求头为JSON格式
//   },
//   body: JSON.stringify({ jd_ut: 2415020.5 }), // 将数据转换为JSON字符串并作为请求体
// })
//   .then((response) => response.json())
//   .then((data) => {
//     result2 = data;
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });
// 将JSON对象转换为字符串
const jsonData = JSON.stringify(result1);

// 将JSON字符串保存到本地存储
localStorage.setItem("listsData", jsonData);
console.log("Lists saved to local storage");
