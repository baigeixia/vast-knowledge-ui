import { collectionRequest } from '@/utils/request'

export function getlist() {
    return collectionRequest({
      url: 'analyze/channel/page',
      method: 'GET',
    })
}