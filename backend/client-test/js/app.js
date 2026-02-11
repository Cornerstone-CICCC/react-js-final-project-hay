const socket = io("http://localhost:3500");

socket.on("connect", () => {
  console.log("connected", socket.id);
});
