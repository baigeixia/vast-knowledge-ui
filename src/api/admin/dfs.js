import { collectionRequest } from '@/utils/request'


export function dfsUploadApi(file, fromValue) {
    const formData = new FormData();
    formData.append('file', file);

    return collectionRequest({
        method: 'POST',
        url: '/dfs/dfs/upload',
        headers: {
            // 这里添加自定义的 from 字段
            'from': fromValue,  // 'from' 作为自定义字段，放在 headers 中
        },
        body: formData
    })
}