import { collectionRequest } from '@/utils/request'

export function getlist({name,status,pageSize,pageNum}) {
    return collectionRequest({
      url: 'analyze/channel/page',
      method: 'GET',
    })
}