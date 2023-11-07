"using strict";

//reconstruct from the work of Thomas Boch
const DRAWING_OPTIONS = [
  "drawequatorofdate",
  "draweclipticofdate",
  "drawhorizon",
  "drawplanets",
  "drawgrid",
  "drawconst",
  "drawconstname",
  "drawstars",
];
const BodyList = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];
const Position = ["longitude", "latitude", "elevation"];
// Model
class AstronomyModel {
  constructor(datetime, longitude = 0, latitude = 0, elevation = 0) {
    // Initialize the model's data
    this.colorValues = [
      "#9bb2ff",
      "#9bb2ff",
      "#9eb5ff",
      "#a3b9ff",
      "#aabfff",
      "#b2c5ff",
      "#bbccff",
      "#c4d2ff",
      "#ccd8ff ",
      "#d3ddff",
      "#dae2ff",
      "#dfe5ff",
      "#e4e9ff",
      "#e9ecff",
      "#eeefff",
      "#f3f2ff",
      "#f8f6ff",
      "#fef9ff",
      "#fff9fb",
      "#fff7f5",
      "#fff5ef",
      "#fff3ea",
      "#fff1e5",
      "#ffefe0",
      "#ffeddb",
      "#ffebd6",
      "#ffe9d2",
      "#ffe8ce",
      "#ffe6ca",
      "#ffe5c6",
      "#ffe3c3",
      "#ffe2bf",
      "#ffe0bb",
      "#ffdfb8",
      "#ffddb4",
      "#ffdbb0",
      "#ffdaad",
      "#ffd8a9",
      "#ffd6a5",
      "#ffd5a1",
      "#ffd29c",
      "#ffd096",
      "#ffcc8f",
      "#ffc885",
      "#ffc178",
      "#ffb765",
      "#ffa94b",
      "#ff9523",
      "#ff7b00",
      "#ff5200",
    ]; // Your color values
    this.colorLimits = [
      -0.4, -0.35, -0.3, -0.25, -0.2, -0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15,
      0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8,
      0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5,
      1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2,
    ]; // Your color limits
    this.datetime = datetime;
    //star map's center's lon
    this.lon0Rad = (longitude * Math.PI) / 180.0;
    //star map's center's lat
    this.lat0Rad = (latitude * Math.PI) / 180.0;
    // //view's starmap radius
    // this.radius = radius;
    // The grid using
    this.observer = new Astronomy.Observer(
      Number(latitude),
      Number(longitude),
      Number(elevation)
    );
    this.rotStarToGrid = Astronomy.Rotation_EQJ_EQD(this.datetime);
    this.rotEclipticToGrid = Astronomy.Rotation_ECT_EQD(this.datetime);
    // this.rotEquatorToGrid = null;
    // this.rotHorizonToGrid = Astronomy.Rotation_HOR_EQD(this.datetime);
  }

  // Add model's data processing and calculation methods
  colorFromB_V(bv) {
    if (bv < this.colorLimits[0]) return this.colorValues[0];

    for (var i = 0; i < this.colorLimits.length - 1; i++) {
      if (bv >= this.colorLimits[i] && bv < this.colorLimits[i + 1])
        return this.colorValues[i + 1];
    }

    return this.colorValues[this.colorValues.length - 1];
  }

  sizeFromVMag(mag) {
    //Should we use log(mag)? Probably not.
    if (mag > 5) return 0.4;
    if (mag > 4) return 0.7;
    if (mag > 3) return 1;
    if (mag > 2) return 1.5;
    if (mag > 1) return 2;
    if (mag > 0) return 2.5;
    if (mag > -1) return 3;
    if (mag > -2) return 3.5;
    if (mag > -3) return 4;
    if (mag > -4) return 4.5;
    if (mag > -5) return 5;

    return 5.5;
  }
  /**
   *
   * @param {*} s star
   * @returns star position on view
   */
  cooToXY(s) {
    if (!s) return;
    const lonRad = (s.ra * Math.PI) / 180.0;
    const latRad = (s.dec * Math.PI) / 180.0;
    const cosc =
      Math.sin(this.lat0Rad) * Math.sin(latRad) +
      Math.cos(this.lat0Rad) *
        Math.cos(latRad) *
        Math.cos(lonRad - this.lon0Rad);
    if (cosc < 0) {
      return null;
    }
    const x = Math.cos(latRad) * Math.sin(lonRad - this.lon0Rad);
    const y =
      Math.cos(this.lat0Rad) * Math.sin(latRad) -
      Math.sin(this.lat0Rad) *
        Math.cos(latRad) *
        Math.cos(lonRad - this.lon0Rad);
    return [x, y];
  }
  // Add other model methods
  positionPlanet(body) {
    const equ_2000 = Astronomy.Equator(
      body,
      this.datetime,
      this.observer,
      false,
      true
    );
    const equ_ofdate = Astronomy.Equator(
      body,
      this.datetime,
      this.observer,
      true,
      true
    );
    const hor = Astronomy.Horizon(
      this.datetime,
      this.observer,
      equ_ofdate.ra,
      equ_ofdate.dec,
      "normal"
    );
    const illumi = Astronomy.Illumination(body, this.datetime); //TODO: repeated in calculation?
    // console.log(body);
    // console.log(illumi);
    return { coordination: equ_ofdate, illumination: illumi };
  }
  positionEcliptic(eclLon) {
    const sphericalECT = new Astronomy.Spherical(0, eclLon, 1);
    const vectorECT = Astronomy.VectorFromSphere(sphericalECT, this.datetime);
    const vector = Astronomy.RotateVector(this.rotEclipticToGrid, vectorECT);
    const spherical = Astronomy.SphereFromVector(vector);
    return spherical;
  }
}

// View
class AstronomyView {
  /**
   *
   * @param {AstronomyModel} model
   */
  constructor(model) {
    const canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    // Initialize other view-related elements and listeners here
    this.drawingOptions = {};
    //a copy of the options.
    // this.drawingStatus = {};
    for (const option of DRAWING_OPTIONS) {
      this.drawingOptions[option] = true;
      // this.drawingStatus[option] = false;
    }
    this.model = model;
    this.olon0 = 999;
    this.olat0 = 999;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.cx = 0; // center of starmap position x
    this.cy = 0; // center of starmap position y
    this.radius = 300;
  }

  // Add view drawing methods
  doDraw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    if (this.drawingOptions["drawconst"]) {
      this.drawConstellations();
    }

    if (this.drawingOptions["drawconstname"]) {
      this.drawConstellationsNames();
    }
    if (this.drawingOptions["drawstars"]) {
      this.drawStars();
    }
    if (this.drawingOptions["drawgrid"]) {
      this.drawGrid();
    }
    if (this.drawingOptions["drawplanets"]) {
      this.drawPlanets();
    }
    if (this.drawingOptions["draweclipticofdate"]) {
      this.drawEcliptic();
    }
  }
  drawStars() {
    for (let i = 1603; i >= 0; i--) {
      //Reduce the 9100 star map to 1603 stars, only vmag < 5
      const s = stars[i];
      const xy = this.model.cooToXY(s);
      if (xy) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.model.colorFromB_V(s.bv);
        this.ctx.arc(
          this.cx - this.radius * xy[0],
          this.cy - this.radius * xy[1],
          this.model.sizeFromVMag(s.vmag),
          0,
          2 * Math.PI,
          true
        );
        this.ctx.fill();
      }
    }
  }
  drawConstellations() {
    this.ctx.strokeStyle = "rgba(100,100,200, 0.5)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    for (let i = 0; i < constellations.length; i++) {
      const constalation = constellations[i];
      for (let j = 0; j < constalation.lines.length; j++) {
        const l1 = this.model.cooToXY({
          ra: constalation.lines[j][0],
          dec: constalation.lines[j][1],
        });
        const l2 = this.model.cooToXY({
          ra: constalation.lines[j][2],
          dec: constalation.lines[j][3],
        });
        if (l1 && l2) {
          this.ctx.moveTo(
            this.cx - this.radius * l1[0],
            this.cy - this.radius * l1[1]
          );
          this.ctx.lineTo(
            this.cx - this.radius * l2[0],
            this.cy - this.radius * l2[1]
          );
        }
      }
    }
    this.ctx.stroke();
    //ctx.restore();
  }
  drawConstellationsNames() {
    //this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(230,120,250, 0.5)";
    this.ctx.textWidth = 2.5;

    for (var i = 0; i < constellations.length; i++) {
      const constellation = constellations[i];
      const xy_raw = this.model.cooToXY({
        ra: constellation.namera,
        dec: constellation.namedec,
      });
      if (xy_raw) {
        this.ctx.fillText(
          constellation.name,
          this.cx - this.radius * xy_raw[0],
          this.cy - this.radius * xy_raw[1]
        );
      }
    }
    this.ctx.stroke();
    //ctx.restore();
  }
  drawGrid() {
    this.ctx.strokeStyle = "rgba(100,200,100, 0.5)";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    let ox, oy;
    let raIdx = -999;
    for (let ra = 0; ra < 360; ra += 20) {
      ox = oy = null;
      for (let dec = -90; dec <= 90; dec = dec + 5) {
        const xy_raw = this.model.cooToXY({
          ra: ra,
          dec: dec,
        });
        const xy = xy_raw
          ? xy_raw.map((number) => -number * this.radius)
          : null;
        if (xy && ox !== null && oy !== null) {
          this.ctx.moveTo(this.cx + ox, this.cy + oy);
          this.ctx.lineTo(this.cx + xy[0], this.cy + xy[1]);
        }
        if (
          xy &&
          xy[0] > 60 &&
          xy[0] < 155 &&
          xy[1] > -65 &&
          xy[1] < 65 &&
          raIdx < 0
        ) {
          raIdx = ra;
        }

        if (xy) {
          ox = xy[0];
          oy = xy[1];
        } else {
          ox = oy = null;
        }
      }
      //text of grid (lon)
      const xy_raw = this.model.cooToXY({
        ra: ra,
        dec: 0,
      });
      const xy = xy_raw ? xy_raw.map((number) => -number * this.radius) : null;
      if (xy && this.ctx.fillText) {
        this.ctx.fillText(ra, this.cx + xy[0], this.cy + xy[1]);
      }
    }

    for (let dec = -90; dec <= 90; dec += 20) {
      ox = oy = null;
      const gg_raw = this.model.cooToXY({
        ra: raIdx,
        dec: dec,
      });
      const gg = gg_raw ? gg_raw.map((number) => -number * this.radius) : null;
      if (gg && this.ctx.fillText)
        this.ctx.fillText(dec, this.cx + gg[0], this.cy + gg[1]);
      for (let ra = 0; ra <= 360; ra = ra + 5) {
        const xy_raw = this.model.cooToXY({
          ra: ra,
          dec: dec,
        });
        const xy = xy_raw
          ? xy_raw.map((number) => -number * this.radius)
          : null;
        if (xy && ox !== null && oy !== null) {
          this.ctx.moveTo(this.cx + ox, this.cy + oy);
          this.ctx.lineTo(this.cx + xy[0], this.cy + xy[1]);
        }
        if (xy) {
          ox = xy[0];
          oy = xy[1];
        } else {
          ox = oy = null;
        }
      }
    }

    this.ctx.stroke();
    //ctx.restore();
  }
  drawPlanets() {
    for (let body of BodyList) {
      const planetInfo = this.model.positionPlanet(body);
      const xy_raw = this.model.cooToXY({
        ra: planetInfo.coordination.ra * 15, //TODO: not coordination? change here
        dec: planetInfo.coordination.dec,
      });
      if (xy_raw) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.arc(
          this.cx - this.radius * xy_raw[0],
          this.cy - this.radius * xy_raw[1],
          this.model.sizeFromVMag(planetInfo.illumination.mag),
          0,
          2 * Math.PI,
          true
        );
        this.ctx.fill();
      }
    }
  }
  drawEcliptic() {
    this.ctx.strokeStyle = "yellow";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    let ox = null, //ox record the line's tail 之前的线头
      oy = null;
    for (let eclLon = 0; eclLon <= 360; eclLon += 2) {
      const spherical = this.model.positionEcliptic(eclLon);
      const xy_raw = this.model.cooToXY({
        ra: spherical.lon,
        dec: spherical.lat,
      });
      const xy = xy_raw ? xy_raw.map((number) => -this.radius * number) : null;
      if (xy && ox !== null && oy !== null) {
        this.ctx.moveTo(this.cx + ox, this.cy + oy);
        this.ctx.lineTo(this.cx + xy[0], this.cy + xy[1]);
      }

      if (xy) {
        ox = xy[0];
        oy = xy[1];
      } else {
        ox = oy = null;
      }
      if (eclLon % 30 === 0 && eclLon !== 360) {
        if (xy && this.ctx.fillText) {
          this.ctx.fillText(eclLon, this.cx + xy[0], this.cy + xy[1]);
        }
      }
    }
    this.ctx.stroke();
  }
}

// Controller
class AstronomyController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // Add controller event handling logic here, e.g., checkbox changes, mouse events, etc.
    this.setupEventListeners();
    this.intervalDelay = 80; // temps en ms entre 2 rafraichissements
    this.intervalId = null;
    this.dragx = null;
    this.dragy = null;
    this.isDragging = false;
  }

  setupEventListeners() {
    // Add event listeners for checkboxes, canvas interactions, and other elements
    // adding listeners to checkboxes
    for (const checkboxId of DRAWING_OPTIONS) {
      const checkboxElement = document.getElementById(checkboxId);
      // checkboxElement = function () {
      //   this.AstronomyView.drawingOptions[checkboxId] = checkboxElement.checked;
      //   doDraw();
      // };
      checkboxElement.addEventListener("change", () => {
        this.view.drawingOptions[checkboxId] = checkboxElement.checked;
        this.view.doDraw();
      });
    }

    const canvas = document.getElementById("canvas");
    canvas.onmousedown = (e) => {
      this.dragx = e.clientX;
      this.dragy = e.clientY;
      this.isDragging = true;
      this.intervalId = setInterval(() => {
        this.view.doDraw();
      }, this.intervalDelay);
    };

    canvas.onmouseup = (e) => {
      this.dragx = this.dragy = null;
      this.isDragging = false;
      clearInterval(this.intervalId);
      this.view.doDraw(); // in case the latest model.lon0Rad and model.lat0Rad not in canvas
    };

    canvas.onmousemove = (e) => {
      if (!this.isDragging) return;
      const xoffset = e.clientX - this.dragx;
      const yoffset = e.clientY - this.dragy;
      const dist = xoffset * xoffset + yoffset * yoffset;
      if (dist < 5) return;
      this.dragx = e.clientX;
      this.dragy = e.clientY;
      this.model.lon0Rad += xoffset * 0.004; // TODO: This constant 0.004 should be checked
      this.model.lat0Rad += yoffset * 0.004;
    };

    //Date and Time
    const dateInput = document.getElementById("dateinput");
    const timeInput = document.getElementById("timeinput");

    const updateDateTime = () => {
      const dateValue = dateInput.value;
      const timeValue = timeInput.value;

      // Create a Date object with the parsed values
      const datetime = luxon.DateTime.fromISO(
        dateValue + "T" + timeValue
      ).toJSDate();
      this.model.datetime = datetime;
    };

    // Add event listeners to dateInput and timeInput
    dateInput.addEventListener("change", updateDateTime);
    timeInput.addEventListener("change", updateDateTime);
    for (const position of Position) {
      const input = document.getElementById(position);
      input.addEventListener("change", (event) => {
        const inputNumber = Number(event.target.value);
        if (isNaN(inputNumber)) return;
        if (position == "latitude" && (inputNumber > 90 || inputNumber < -90))
          return;
        if (
          position == "longitude" &&
          (inputNumber > 360 || inputNumber < -360)
        )
          return;
        this.model.observer[position] = inputNumber;
        this.view.doDraw();
      });
    }

    //Add event listener to the radio button: choose which grid system
    const radioButtons = document.getElementsByName("gridGroup");

    // for (const radioButton of radioButtons) {
    //   radioButton.addEventListener("change", (event) => {
    //     switch (selectedValue) {
    //       case "gridHorizon":
    //         // 处理 "Grid: Horizon" 被选择的情况
    //         this.model.rot = Astronomy.Rotation_ECT_EQJ(this.model.datetime);
    //         break;
    //       case "gridEquatorOfDate":
    //         // 处理 "Grid: Equator (of date)" 被选择的情况
    //         this.model.rot = Astronomy.Rotation_ECT_EQD(this.model.datetime);
    //         break;
    //       case "gridEclipticOfDate":
    //         // 处理 "Grid: Ecliptic (of date)" 被选择的情况
    //         this.model.rot = Astronomy.Rotation_ECT_EQJ(this.model.datetime);
    //         break;
    //       default:
    //         break;
    //     }
    //   });
    // }
    this.view.width = canvas.width;
    this.view.height = canvas.height;
    this.view.cx = canvas.width / 2;
    this.view.cy = canvas.height / 2;
    this.view.radius = 300;
    if (canvas.getContext) {
      this.view.ctx = canvas.getContext("2d");
      this.view.doDraw();
    }
  }
}

function initializeAstronomyApp() {
  const model = new AstronomyModel(
    luxon.DateTime.local().toJSDate(),
    40.7128,
    -74.006
  );
  const view = new AstronomyView(model);
  window.controller = new AstronomyController(model, view);
}

// Initialize the application when the page loads
window.addEventListener("load", initializeAstronomyApp);
