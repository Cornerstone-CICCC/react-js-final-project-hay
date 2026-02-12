const btnEnter1 = document.getElementById("btn-enter1");
const btnLeave1 = document.getElementById("btn-leave1");

const btnEnter2 = document.getElementById("btn-enter2");
const btnLeave2 = document.getElementById("btn-leave2");

const btnEnter3 = document.getElementById("btn-enter3");
const btnLeave3 = document.getElementById("btn-leave3");

const btnEnter4 = document.getElementById("btn-enter4");
const btnLeave4 = document.getElementById("btn-leave4");

const btnEnter5 = document.getElementById("btn-enter5");
const btnLeave5 = document.getElementById("btn-leave5");

const socket = io("http://localhost:3500");

socket.on("connect", () => {
  console.log("connected", socket.id);
});

btnEnter1.addEventListener("click", function () {
  socket.emit("shopProduct", {
    productId: 1,
    userId: 1,
  });
});

btnLeave1.addEventListener("click", function () {
  socket.emit("leaveProduct", {
    productId: 1,
    userId: 1,
  });
});

btnEnter2.addEventListener("click", function () {
  socket.emit("shopProduct", {
    productId: 2,
    userId: 2,
  });
});

btnLeave2.addEventListener("click", function () {
  socket.emit("leaveProduct", {
    productId: 2,
    userId: 2,
  });
});

btnEnter3.addEventListener("click", function () {
  socket.emit("shopProduct", {
    productId: 3,
    userId: 3,
  });
});

btnLeave3.addEventListener("click", function () {
  socket.emit("leaveProduct", {
    productId: 3,
    userId: 3,
  });
});

btnEnter4.addEventListener("click", function () {
  socket.emit("shopProduct", {
    productId: 3,
    userId: 3,
  });
});

btnLeave4.addEventListener("click", function () {
  socket.emit("leaveProduct", {
    productId: 3,
    userId: 3,
  });
});

btnEnter5.addEventListener("click", function () {
  socket.emit("shopProduct", {
    productId: 5,
    userId: 5,
  });
});

btnLeave5.addEventListener("click", function () {
  socket.emit("leaveProduct", {
    productId: 5,
    userId: 5,
  });
});
