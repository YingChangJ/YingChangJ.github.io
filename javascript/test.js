const timeUT = new Astronomy.AstroTime(new Date());
const mcECTSphere = new Astronomy.Spherical(0, 120, 1);
const mcECTVector = Astronomy.VectorFromSphere(mcECTSphere, timeUT);
const mcRot = Astronomy.Rotation_ECT_EQD(timeUT);
const mcEQDVector = Astronomy.RotateVector(mcRot, mcECTVector);
const mcEQDSphere = Astronomy.SphereFromVector(mcEQDVector);
console.log(mcEQDSphere.lon);

const sidTime = Astronomy.SiderealTime(timeUT);
up = -Math.cos(((sidTime + 8) / 24) * 2 * Math.PI);
e = (23.44 / 360) * 2 * Math.PI;
left = Math.sin(((sidTime + 8) / 24) * 2 * Math.PI) * Math.cos(e);
fi = (39 / 360) * Math.PI * 2;
right = Math.tan(fi) * Math.sin(e);
res = Math.atan(up / (left + right));
(res / 2 / Math.PI) * 360;

const select = document.querySelectorAll(".select");
const clearBtn = document.getElementById("clear");

const inputDMS = document.querySelectorAll("input");
const possibleDates = document.getElementById("chartre");
const ul = document.getElementById("result-date");
clearBtn.addEventListener("click", function () {
  inputDMS.forEach((input) => {
    input.value = "";
  });
});

inputDMS.forEach((input, idx) => {
  input.addEventListener("input", (e) => {
    if (idx < 14 && e.target.value >= 6) {
      setTimeout(() => inputDMS[idx + 1].focus(), 10);
    }
  });
});

possibleDates.addEventListener("click", function () {
  let emptyFound = false;
  Array.from(inputDMS)
    .slice(0, 9)
    .forEach((input) => {
      if (input.value === "") {
        emptyFound = true;
      }
    });
  if (emptyFound) {
    alert("Tell us the positions of the Sun, Moon and Saturn...");
    return;
  }
  console.log("Al ho survive!");
  const re = convertChartDateTime(
    Number(inputDMS[0].value) +
      select[0].selectedIndex * 30 +
      inputDMS[1].value / 60 +
      inputDMS[2].value / 3600,
    Number(inputDMS[3].value) +
      select[1].selectedIndex * 30 +
      inputDMS[4].value / 60 +
      inputDMS[5].value / 3600,
    Number(inputDMS[6].value) +
      select[2].selectedIndex * 30 +
      inputDMS[7].value / 60 +
      inputDMS[8].value / 3600
  );
  // 清空 <ul> 元素的内容
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  if (re) {
    // 遍历数组并为每个项创建 <li> 元素
    re.forEach((item) => {
      const li = document.createElement("li");

      //Found, then we need to figure our the locations
      const sidTime = Astronomy.SiderealTime(new Astronomy.AstroTime(re[0]));
      const lon = (li.textContent =
        re[0] + "\nDiff: Sun ${re[2]}, Moon ${re[0]}, Saturn ${re[1]}");
      //ul.appendChild(li); // 将 <li> 添加到 <ul> 中
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "Nothing found.";
    ul.appendChild(li);
  }
});

function convertChartDateTime(sun, moon, saturn) {
  const result = [];
  console.log(`${sun}`);
  const observer = new Astronomy.Observer(0.0, 0.0, 0.0);
  // from year 100 to year 2100, about 67 orbit period of saturn
  // three time hit a certern lon at most
  //1. have an estimation of where saturn is.
  // Using sinA/a = sinB/B, semi-major of saturn is about 9.573
  const saturnHelio =
    (Math.asin(Math.sin(((saturn - sun) / 180) * Math.PI) / 9.573) * 180) /
      Math.PI +
    saturn;
  for (let i = 0; i < 70; i++) {
    //2. have an estimation of when in the orbital cycle is our saturn
    // 10746.5181971891777558 is orbital period in day, 1730186.643612854 is our start point when saturn's longitude is 0
    // and the  360.0 / 10746.5181971891777558 is saturn's speed in (degree per day)
    const t0 =
      10746.5181971891777558 * i +
      1730186.643612854 +
      (saturnHelio / 360.0) * 10746.5181971891777558 -
      2451545.0;
    //3. that estimation have error less than 10 degrees in 2000 years.
    // which means the possible dates is 10 degrees / degree per day, which never more than 303 days to the estimation.
    // in the two years time, only two dates need to be examined: check the saturn and the moon in these two day.
    const t0AstroTime = Astronomy.AstroTime.FromTerrestrialTime(t0);
    const t1 = Astronomy.SearchSunLongitude(
      sun,
      t0AstroTime.AddDays(-730),
      365
    );
    const t3 = Astronomy.SearchSunLongitude(
      sun,
      t0AstroTime.AddDays(-365),
      365
    );
    const t2 = Astronomy.SearchSunLongitude(sun, t0AstroTime, 365);
    const t4 = Astronomy.SearchSunLongitude(sun, t0AstroTime.AddDays(365), 365);
    let moonGeo;

    if (t1) {
      const equator = Astronomy.Equator("Saturn", t1, observer, false, true);
      const ect = Astronomy.Ecliptic(equator.vec);
      //0.02 is the tolarence set here. it is about 1 arcminute
      if (Math.abs(ect.elon - saturn) > 0.02) {
      } else {
        moonGeo = Astronomy.EclipticGeoMoon(t1).lon;
        if (Math.abs(moonGeo - moon) > 0.02) {
        } else {
          result.push([
            t1,
            moonGeo - moon,
            ect.elon - saturn,
            Astronomy.SunPosition(t1).elon - sun,
          ]);
        }
      }
    }
    if (t2) {
      const equator = Astronomy.Equator("Saturn", t2, observer, false, true);
      const ect = Astronomy.Ecliptic(equator.vec);
      if (Math.abs(ect.elon - saturn) > 0.02) {
      } else {
        moonGeo = Astronomy.EclipticGeoMoon(t2).lon;
        if (Math.abs(moonGeo - moon) > 0.02) {
        } else {
          result.push([
            t2,
            moonGeo - moon,
            ect.elon - saturn,
            Astronomy.SunPosition(t2).elon - sun,
          ]);
        }
      }
    }
    if (t3) {
      const equator = Astronomy.Equator("Saturn", t3, observer, false, true);
      const ect = Astronomy.Ecliptic(equator.vec);
      if (Math.abs(ect.elon - saturn) > 0.5) {
      } else {
        moonGeo = Astronomy.EclipticGeoMoon(t3).lon;
        if (Math.abs(moonGeo - moon) > 0.5) {
        } else {
          result.push([
            t3,
            moonGeo - moon,
            ect.elon - saturn,
            Astronomy.SunPosition(t3).elon - sun,
          ]);
        }
      }
    }
    if (t4) {
      const equator = Astronomy.Equator("Saturn", t4, observer, false, true);
      const ect = Astronomy.Ecliptic(equator.vec);
      if (Math.abs(ect.elon - saturn) > 0.5) {
      } else {
        moonGeo = Astronomy.EclipticGeoMoon(t4).lon;
        if (Math.abs(moonGeo - moon) > 0.5) {
        } else {
          result.push([
            t4,
            moonGeo - moon,
            ect.elon - saturn,
            Astronomy.SunPosition(t4).elon - sun,
          ]);
        }
      }
    }

    // const saturnTime = Astronomy.Search(
    //   (t) => Astronomy.EclipticLongitude("Saturn", t) - saturn,
    //   new Astronomy.AstroTime(t1 - 16 - 2451545.0),
    //   new Astronomy.AstroTime(t1 + 16 - 2451545.0)
    // );
  }
  return result;
}
