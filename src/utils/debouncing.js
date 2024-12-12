// export default function debounce(func, wait) {
//     let timeout;
//     return function(...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func(...args), wait);
//     };
// }


export default function debounce(func, wait) {
    // 用来判断是否是第一次调用
    let timeout;
    let isFirstCall = true;
       return function(...args) {
           // 如果是第一次调用，立即执行函数
           if (isFirstCall) {
               func(...args);
               isFirstCall = false;  // 设置第一次调用标志为 false
           } else {
               // 非第一次调用时，清除之前的定时器，并设置新的定时器
               clearTimeout(timeout);
               timeout = setTimeout(() => {
                   func(...args);
               }, wait);
           }
       };
   }
   
