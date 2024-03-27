import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";
import * as Astronomy from "./astronomy-engine.js";
import { DateTime } from "./luxon.js";

const scene = new THREE.Scene();
const MOON_RADIUS = 173.71;
// 获取日期时间输入框元素
const datetimeInput = document.getElementById("datetime-moon");
let datetime = DateTime.now().setZone("utc");

// 设置日期输入框的值
datetimeInput.value = datetime.toISO().slice(0, 16);
datetime = datetime.toMillis();
const lon = document.getElementById("lon");
const lat = document.getElementById("lat");
const pa = document.getElementById("pa");
const sunLon = document.getElementById("sun-lon");
const sunLat = document.getElementById("sun-lat");
const horizon = document.getElementById("horizon");
const dist = document.getElementById("distance");

let isPlaying = true; // 控制动画是否正在播放
let includePA = true; //if position angle of axis is included
let includeShadow = false;
// 按钮点击事件处理函数
document.getElementById("toggleButton").addEventListener("click", function () {
  isPlaying = !isPlaying; // 切换播放状态
  // 根据播放状态修改按钮文本
  if (isPlaying) {
    this.textContent = "Pause";
    animate();
  } else {
    this.textContent = "Play";
  }
});
document.getElementById("setButton").addEventListener("click", function () {
  datetime = DateTime.fromISO(datetimeInput.value + "Z").setZone("utc");
  datetime = +datetime;
  updateOneframe(datetime);
});
document.getElementById("view").addEventListener("click", function () {
  updateFromLibration(
    Number(lon.value),
    Number(lat.value),
    Number(pa.value),
    Number(sunLon.value),
    Number(sunLat.value)
  );
});
const paExclude = document.getElementById("pa-exclude");
paExclude.addEventListener("click", function () {
  if (paExclude.checked) {
    includePA = false;
    horizon.innerText = "orbital plane of Moon";
    updateOneframe(datetime);
  } else {
    includePA = true;
    horizon.innerText = "equator";
    updateOneframe(datetime);
  }
});

// 创建辅助点的几何体和材质
const geometrySubEarth = new THREE.SphereGeometry(2, 2, 2);
const materialSubEarth = new THREE.MeshBasicMaterial({ color: 0x34a8eb });
// Declare a variable to store the reference to the helper point
let subEarth;
// Get the checkbox element
const checkboxSubEarth = document.getElementById("sub-earth");
// Add an event listener for the "change" event
checkboxSubEarth.addEventListener("change", function () {
  if (checkboxSubEarth.checked) {
    // If the checkbox is checked, create the helper point and add it to the scene
    subEarth = new THREE.Mesh(geometrySubEarth, materialSubEarth);
    subEarth.position.set(-2000, 0, 0);
    scene.add(subEarth);
  } else {
    // If the checkbox is unchecked, remove the helper point from the scene
    if (subEarth) {
      scene.remove(subEarth);
      subEarth = undefined; // Clear the reference
    }
  }
  updateOneframe(datetime);
});

const geometrySubSun = new THREE.SphereGeometry(2, 2, 2);
const materialSubSun = new THREE.MeshBasicMaterial({ color: 0xf27252 });
let subSun;
// Get the checkbox element
const checkboxHelperSubSun = document.getElementById("sub-sun");
// Add an event listener for the "change" event
checkboxHelperSubSun.addEventListener("change", function () {
  if (checkboxHelperSubSun.checked) {
    // If the checkbox is checked, create the helper point and add it to the scene
    subSun = new THREE.Mesh(geometrySubSun, materialSubSun);
    subSun.position.set(-2000, 20, 0);
    scene.add(subSun);
  } else {
    // If the checkbox is unchecked, remove the helper point from the scene
    if (subSun) {
      scene.remove(subSun);
      subSun = undefined; // Clear the reference
    }
  }
  updateOneframe(datetime);
});

// // 创建平行光
const defaultIntensity = 1.2;
const directionalLight = new THREE.DirectionalLight(0xffffff, 0); // 白色平行光
directionalLight.position.set(-100, 0, 0); // 设置光源的初始位置
// directionalLight.shadow.bias = -0.0005;
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, defaultIntensity);
scene.add(ambientLight);
const checkboxShadow = document.getElementById("shadow");
// Add an event listener for the "change" event
checkboxShadow.addEventListener("change", function () {
  if (checkboxShadow.checked) {
    includeShadow = true;
    // If the checkbox is checked, decrease ambience light, increase directional light
    directionalLight.intensity = defaultIntensity;
    ambientLight.intensity = 0.5;
  } else {
    // If the checkbox is unchecked, decrease directional light, increase amb light
    directionalLight.intensity = 0;
    ambientLight.intensity = defaultIntensity;
    includeShadow = false;
  }
  updateOneframe(datetime);
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 设置相机的位置和视点
const camera = new THREE.PerspectiveCamera(
  0.8, //fov of moon is 1/2 degree
  window.innerWidth / window.innerHeight,
  1,
  65536
);
camera.position.x = -38439.9; //distance 384399 km
camera.lookAt(new THREE.Vector3(0, 0, 0));

// renderer.render(scene, camera);
// Show loading message or indicator
var loadingMessage = document.createElement("div");
loadingMessage.style.position = "absolute";
loadingMessage.style.top = "50%";
loadingMessage.style.left = "50%";
loadingMessage.textContent = "Loading...";
document.body.appendChild(loadingMessage);
let model;
var texloader = new THREE.TextureLoader();
texloader.load(
  "./javascript/displacement.jpg",
  function (displacement) {
    texloader.load(
      "./javascript/checker.png",
      function (img) {
        const geometry = new THREE.SphereGeometry(MOON_RADIUS, 70, 70);
        // Reverse UV mapping
        const offset = new THREE.Vector2(0.5, 0);
        img.offset = offset;
        displacement.offset = offset;
        img.wrapS = THREE.RepeatWrapping;
        img.wrapT = THREE.RepeatWrapping;
        displacement.wrapS = THREE.RepeatWrapping;
        displacement.wrapT = THREE.RepeatWrapping;
        // img.repeat = repeat;
        // displacement.repeat = repeat;
        const material = new THREE.MeshStandardMaterial({
          map: img,
          color: 0xb2b2b2,
          displacementMap: displacement,
          displacementScale: 1,
          // flipX: true,
          bumpMap: displacement,
          bumpScale: 1,
          // shininess: 0,
          // uvScale: {
          //   type: "v2",
          //   value: new THREE.Vector2(0.5, 0.5),
          // },
        });
        // material.offset = offset;
        model = new THREE.Mesh(geometry, material);

        scene.add(model);
        document.body.removeChild(loadingMessage);
        updateOneframe(2460240);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
function animate() {
  if (isPlaying) {
    requestAnimationFrame(animate);
    // 如果模型加载成功
    datetime += 1800000;
    const newDate = DateTime.fromMillis(datetime).setZone("utc");
    datetimeInput.value = newDate.toISO().slice(0, 16);
    updateOneframe(datetime);
  }
}
function date2ut(date) {
  return (+date - 946728000000) / 86400000;
}
function updateOneframe(timeCal) {
  if (model) {
    const time = new Astronomy.AstroTime(date2ut(timeCal));
    // console.log(time);
    const libration = Astronomy.Libration(time);
    // 每帧旋转一定角度
    // const currentRotation = model.rotation.toArray(); // 将当前欧拉角转换为数组
    libration.elon = libration.elon + 0.0003401946904021133;
    libration.elat = libration.elat - 0.022385236696709897;

    lon.value = libration.elon.toFixed(3);
    lat.value = libration.elat.toFixed(3);
    let paValue = libration.position_angle_axis;
    if (paValue < 0) {
      paValue += 360;
    }
    pa.value = paValue.toFixed(3);
    sunLon.value = libration.sub_sun_lon.toFixed(3);
    sunLat.value = libration.sub_sun_lat.toFixed(3);

    dist.innerHTML = libration.dist_km.toFixed(1);
    camera.position.x = -libration.dist_km / 10;
    updateFromLibration(
      libration.elon,
      libration.elat,
      libration.position_angle_axis,
      libration.sub_sun_lon,
      libration.sub_sun_lat
    );
  }
}
function updateFromLibration(lon, lat, positionAngle, sunLon, sunLat) {
  const newLon = (lon / 180) * Math.PI;
  const newLat = (lat / 180) * Math.PI;
  model.rotation.set(0, -newLon, 0); // 更新模型的旋转
  model.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), newLat);
  if (includePA) {
    model.rotateOnWorldAxis(
      new THREE.Vector3(-1, 0, 0),
      (positionAngle / 180) * Math.PI
    );
  }
  // // 每次更新光源角度
  if (includeShadow || subSun) {
    // to xyz
    const subSunVectorLocal = Astronomy.VectorFromSphere(
      new Astronomy.Spherical(sunLat, sunLon, 1),
      0
    );
    // to three vector
    const localThree = new THREE.Vector3(
      -subSunVectorLocal.x,
      subSunVectorLocal.z,
      subSunVectorLocal.y
    );
    // 将局部 X 轴方向向量转换到模型的局部坐标系中
    const subSunVectorWorld = localThree.applyMatrix4(model.matrixWorld);
    // 获取模型的世界变换矩阵的逆矩阵
    // const worldInverseMatrix = new THREE.Matrix4();
    // worldInverseMatrix.copy(model.matrixWorld).invert();
    if (subSun) {
      // 1. 计算当前向量的长度
      const currentLength = subSunVectorWorld.length();
      // 2. 计算缩放因子
      const scaleFactor = (MOON_RADIUS + 5) / currentLength;
      // 3. 缩放向量
      subSunVectorWorld.multiplyScalar(scaleFactor);
      subSun.position.set(
        subSunVectorWorld.x,
        subSunVectorWorld.y,
        subSunVectorWorld.z
      );
    }
    if (includeShadow) {
      // 输出旋转后的向量
      directionalLight.position.set(
        subSunVectorWorld.x,
        subSunVectorWorld.y,
        subSunVectorWorld.z
      );
    }
  }

  renderer.render(scene, camera);
}
