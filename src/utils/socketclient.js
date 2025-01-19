import { io } from "socket.io-client";
import { onMounted, onUnmounted } from 'vue';
import { getToken } from '@/utils/auth'

const config = {
  reconnectionDelayMax: 10000,
  // autoConnect: false,
  // forceNew: true,
  path: "/behaviour/",
  auth: {
    token: getToken()
  }
}

// export const socket = io('wss://aidighub.com:19090',
//   {
//     ...config,
//   });

  export const socket = io('localhost:9090',
    {
      ...config,
    });


export function useSockets() {
  // 在组件挂载时设置重连尝试逻辑
  onMounted(() => {
    reconnectAttempt(socket);
  });

  // 在组件卸载时断开连接
  onUnmounted(() => {
    socket.disconnect();
  });

  function reconnectAttempt(socket) {
    socket.on("reconnect_attempt", (attempt) => {
      console.log('重新连接尝试 attempt:', attempt);
      if (attempt > 10) {
        console.log('重新连接尝试次数超过最大限制，断开连接。');
        socket.disconnect();
      }
    });
  }
}


export function socketEmit(topic, data) {
  socket.emit(topic, data, callback)
}
const callback = (data) => {
  if (data) {
    if (data.code === 400) {
      ElMessage({
        message: data.msg
        , type: 'warning'
      })
    }
  }
}


// socket.on("connect", () => {
//   console.log("此事件由 Socket 实例在连接和重新连接时触发。");
// });

// socket.io.on("reconnect_attempt", (attempt) => {
//   // console.log('重新连接尝试 attempt:', attempt);
//   // 如果尝试次数超过最大限制，则断开连接
//   if (attempt > 10) {
//     // console.log('重新连接尝试次数超过最大限制，断开连接。');
//     socket.disconnect();
//   }
// });

// socket.on("connect", () => {
//   const engine = socket.io.engine;
//   // console.log(engine.transport.name); // in most cases, prints "polling"

//   // engine.once("upgrade", () => {
//   //   // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
//   //   console.log(engine.transport.name); // in most cases, prints "websocket"
//   // });

//   engine.on("packet", ({ type, data }) => {
//     // called for each packet received
//     console.log("接收数据时 data: ", data);
//   });

//   engine.on("packetCreate", ({ type, data }) => {
//     // called for each packet sent
//     console.log("发送数据时 data: type:", type, data);
//   });

//   engine.on("drain", () => {
//     // called when the write buffer is drained
//     console.log("缓冲区读取完成了");
//   });

//   engine.on("close", (reason) => {
//     // called when the underlying connection is closed
//     console.log("关闭了");
//   });
// });

// attempt 尝试链接次数


// socket.io.on("reconnect", () => {
//   console.log("重新连接");
// });


// socket.on("connect_error", () => {
//   console.log('低级连接无法建立 或者 服务器在中间件功能中拒绝连接');
// });

// socket.on("disconnect", (reason) => {
//   console.log("此事件在断开连接时触发 reason:", reason);
//   //在所有其他情况下，客户端将等待一个小的随机延迟，然后尝试重新连接：
//   if (reason === "io server disconnect") {
//     //服务器已使用socket.disconnect()强制断开socket
//     console.log('服务器已使用socket.disconnect()强制断开socket');
//     socket.connect();
//   }
//   // io client disconnect 使用socket.disconnect()手动断开socket
//   // socket.connect();
// });

//默认情况下，在 Socket 未连接时发出的任何事件都将被缓冲，直到重新连接。 但它可能会在连接恢复时导致大量事件。
// 有几种解决方案可以防止这种行为，具体取决于您的用例：
// 1、 使用Socket 实例的connected 属性 attribute of the Socket instance  https://socket.io/zh-CN/docs/v4/client-socket-instance/#socketconnected
// 该属性描述套接字当前是否连接到服务器。
// if (socket.connected) {
//   socket.emit( /* ... */ );
// } else {
//   // ...
// }
// 2、 使用 volatile 事件 Volatile 如果底层连接没有准备好就不会发送的事件 在可靠性方面有点像UDP
// socket.volatile.emit( /* ... */ );


// 回调
// socket.emit("update item", "1", { name: "updated" }, (response) => {
//   console.log(response.status); // ok
// });

//超时 从 Socket.IO v4.4.0 开始，您现在可以为每个发射分配超时：
// socket.timeout(5000).emit("my-event", (err) => {
//   if (err) {
//     // the other side did not acknowledge the event in the given delay
//   }
// });
// 也可以 确定
// socket.timeout(5000).emit("my-event", (err, response) => {
//   if (err) {
//     // the other side did not acknowledge the event in the given delay
//   } else {
//     console.log(response);
//   }
// });


// 监听事件 格式 socket.on(eventName, listener)
// 1、 socket.on("details", (...args) => {
// });

// 2、const listener = (...args) => {
//   console.log(args);
// }
// socket.on("details", listener);

// 移除
// socket.off("details", listener);

// Catch-all 侦听器
// 添加一个监听器，当任何事件发出时将被触发。
// socket.onAny((eventName, ...args) => {
// });

// 添加一个监听器到侦听器数组的开头，当任何事件发出时将被触发
// socket.prependAny((eventName, ...args) => {
// });

// 删除所有catch-all侦听器或给定的侦听器。 socket.offAny([listener])

// const listener = (eventName, ...args) => {
//   console.log(eventName, args);
// }
// 移除指定
// socket.offAny(listener);
// 移除所有
// socket.offAny();

// 错误处理
// Socket.IO 库中目前没有内置的错误处理，这意味着您必须捕获任何可能在侦听器中引发的错误。
// io.on("connection", (socket) => {
//   socket.on("list items", async (callback) => {
//     try {
//       const items = await findItems();
//       callback({
//         status: "OK",
//         items
//       });
//     } catch (e) {
//       callback({
//         status: "NOK"
//       });
//     }
//   });
// });

