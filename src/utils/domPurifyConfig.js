import DOMPurify from 'dompurify';

const dfconfig = {
  ALLOWED_TAGS: [], // 不允许任何标签，会转义所有标签
  FORBID_TAGS: [], // 不禁止任何标签
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onmouseout'], // 禁止执行危险的事件处理程序
};

export const safeHtml = (html,upconfig={})=>{
    let config={dfconfig,upconfig}
   return  DOMPurify.sanitize(html, config)
};
