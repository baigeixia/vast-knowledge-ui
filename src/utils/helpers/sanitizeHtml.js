import DOMPurify from 'dompurify';

const defaultConfig = {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href'],
    // 将 KEEP_CONTENT 设置为 true，保留未被允许的标签内容
    KEEP_CONTENT: true,
    USE_PROFILES: true,
};

export function sanitizeHtml(html, config = {}) {
    // console.log('sanitizeHtml');
    // const mergedConfig = { ...defaultConfig, ...config };
    // return DOMPurify.sanitize(html, mergedConfig);
    return DOMPurify.sanitize(html, config);
}