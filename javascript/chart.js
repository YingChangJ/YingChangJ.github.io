"using strict";
import * as Astronomy from "./astronomy-engine.js";

let data = {
  planets: {
    Pluto: [0],
    Neptune: [0],
    Uranus: [0],
    Saturn: [0],
    Jupiter: [0],
    Mars: [0],
    Moon: [0],
    Sun: [0],
    Mercury: [0],
    Venus: [0],
  },
  cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
};
function distance(degree1, degree2) {
  //degree1 >= degree2 if not cross 360, find the distance, when degree2 counter-clockwise to degree1
  if (degree1 >= degree2) {
    return degree1 - degree2;
  } else {
    return degree1 + 360 - degree2;
  }
}
function trisection(degree1, degree2) {
  //degree1 >= degree2 if not cross 360, find the trisection points, when degree2 counter-clockwise to degree1
  // Calculate the first and second trisection points
  const deg1 = degree1 >= degree2 ? degree1 : degree1 + 360;
  const trisect1 = (2 * deg1 + degree2) / 3;
  const trisect2 = (deg1 + 2 * degree2) / 3;
  return [trisect1 % 360, trisect2 % 360];
}
function calculation() {
  // 获取查询字符串
  const queryString = window.location.search;

  // 解析查询字符串为对象
  const params = new URLSearchParams(queryString);

  // 假设从查询字符串中获取到的是字符串
  const utString = params.get("ut");
  const lonString = params.get("lon");
  const latString = params.get("lat");

  // 使用 parseFloat 将字符串转换为浮点数
  const ut = parseFloat(utString);
  const lon = parseFloat(lonString);
  const lat = parseFloat(latString);

  // 输出参数值
  // console.log("ut:", ut);
  // console.log("lon:", lon);
  // console.log("lat:", lat);

  // 在这里你可以使用获取到的参数值进行其他
  // 获取 planets 对象的所有键
  const planetKeys = Object.keys(data.planets);
  const time = new Astronomy.AstroTime(ut);
  // 使用 forEach 遍历每个键
  planetKeys.forEach((planet) => {
    // 将键转换为字符串并进行运算
    // location in Geocentric in J2000

    const locEQJ = Astronomy.GeoVector(String(planet), time, true);
    const rotEQJ_ECT = Astronomy.Rotation_EQJ_ECT(time);
    const locECT = Astronomy.RotateVector(rotEQJ_ECT, locEQJ);
    const sphereECT = Astronomy.SphereFromVector(locECT);

    // 输出结果
    //   console.log(`Result for ${planet}: ${sphereECT.lon}`);
    data.planets[planet] = [sphereECT.lon];
  });
  const siderealTime = Astronomy.SiderealTime(time);

  const e = (Astronomy.e_tilt(time).tobl / 360) * 2 * Math.PI;
  const theta = ((siderealTime + lon / 15) / 24) * 2 * Math.PI;
  const fi = (lat / 180) * Math.PI;
  //asc and mc
  let asc =
    (Math.atan(
      -Math.cos(theta) /
        (Math.sin(theta) * Math.cos(e) + Math.tan(fi) * Math.sin(e))
    ) *
      180) /
    Math.PI;
  let mc =
    (Math.atan(Math.sin(theta) / Math.cos(theta) / Math.cos(e)) * 180) /
    Math.PI;
  if (asc < 0) asc += 180;
  if (mc < 0) mc += 180;
  const distanceLSTtoASC = distance(asc, siderealTime * 15 + lon);
  if (distanceLSTtoASC >= 180) {
    asc += 180;
  }
  const distanceMCtoASC = distance(asc, mc);
  if (distanceMCtoASC >= 180) {
    mc += 180;
  }
  data.cusps[0] = asc;
  data.cusps[3] = (180 + mc) % 360;
  data.cusps[6] = (180 + asc) % 360;
  data.cusps[9] = mc;
  [data.cusps[2], data.cusps[1]] = trisection(data.cusps[0], data.cusps[3]);
  [data.cusps[5], data.cusps[4]] = trisection(data.cusps[3], data.cusps[6]);
  [data.cusps[8], data.cusps[7]] = trisection(data.cusps[6], data.cusps[9]);
  [data.cusps[11], data.cusps[10]] = trisection(data.cusps[9], data.cusps[0]);
}

function drawing() {
  // 执行绘图操作
  console.log(data);
  const chart = new astrochart.Chart("paper", 800, 800);
  const radix = chart.radix(data);
}
function control() {
  calculation();
  drawing();
}
control();
