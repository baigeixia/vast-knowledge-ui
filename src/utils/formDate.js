
export function formatTime(timeString) {
    const now = new Date();
    const time = new Date(timeString);
    const diff = now - time;

    // 根据时间差值选择显示的格式
    if (diff < 60000) { // 小于1分钟
      return '刚刚';
    } else if (diff < 3600000) { // 小于1小时
      const minutes = Math.floor(diff / 60000);
      return `${minutes} 分钟前`;
    } else if (diff < 86400000) { // 小于1天
      const hours = Math.floor(diff / 3600000);
      return `${hours} 小时前`;
    } else if (diff < 2592000000) { // 小于30天
      const days = Math.floor(diff / 86400000);
      return `${days} 天前`;
    } else if (diff < 31536000000) { // 小于365天（大约1年）
        const months = Math.floor(diff / 2592000000);
        return `${months} 个月前`;
      } else {
        // 超过1年，显示具体的日期时间
        const formattedTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
        return formattedTime;
      }
  }


  export function formatDateTime(dateTimeStr) {
    // Parse the input string into a Date object
    const date = new Date(dateTimeStr);
    
    // Extract the date and time components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Construct the formatted string
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDate(dateTimeStr) {
  // Parse the input string into a Date object
  const date = new Date(dateTimeStr);
  
  // Extract the date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  // Construct the formatted string
  return `${year}-${month}-${day}`;
}

export function getCurrentTime() {
  // 获取当前时间
  const now = new Date();
  
  // 提取小时、分钟和秒，并确保它们是两位数
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 格式化时间字符串
  return `${hours}:${minutes}:${seconds}`;
}


export function formatMessageTime(messageTime) {
    const now = new Date();
    const messageDate = new Date(messageTime);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    // 定义格式化选项
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateOptions = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fullDateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    // 如果是今天
    if (messageDate.toDateString() === today.toDateString()) {
        return messageDate.toLocaleTimeString([], timeOptions);
    }
    // 如果是昨天
    if (messageDate.toDateString() === yesterday.toDateString()) {
        return messageDate.toLocaleString([], dateOptions);
    }
    // 如果是大于一年的
    if (messageDate < new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())) {
        return messageDate.toLocaleString([], fullDateOptions);
    }
    // 默认格式
    return messageDate.toLocaleString([], dateOptions);
}


export function getTimeGroup(createdAt) {
  const now = new Date();
  const diffInMs = now - new Date(createdAt); // 时间差，单位为毫秒

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // 计算相差的天数

  if (diffInDays === 0) {
      return '今天';
  } else if (diffInDays === 1) {
      return '昨天';
  } else if (diffInDays <= 7) {
      return '7天前';
  } else if (diffInDays <= 30) {
      return '30天前';
  } else {
      return '更久';
  }
}