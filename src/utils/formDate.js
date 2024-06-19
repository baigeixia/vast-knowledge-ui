
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