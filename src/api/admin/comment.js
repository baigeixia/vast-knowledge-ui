import { coreRequest } from '@/utils/request'

export function saveComment(type,channelId,entryId,content,image) {
    return coreRequest({
      url: '/comment/Comment/saveComment',
      method: 'POST',
      data:{
        type: type,
        channelId: channelId,
        entryId: entryId,
        content: content,
        image: image,
      }
    })
}

export function saveCommentRe(commentId,commentRepayId,content,image) {
  return coreRequest({
    url: '/comment/CommentRepay/saveCommentRe',
    method: 'POST',
    data:{
      commentRepayId: commentRepayId,
      commentId: commentId,
      content: content,
      image: image,
    }
  })
}


export function getCommentList(entryId,type,page,size) {
  return coreRequest({
    url: '/comment/Comment/getCommentList',
    method: 'GET',
    params:{
      entryId: entryId,
      type: type,
      page: page,
      size: size,
    }
  })
}


export function getCommentReList(commentId,page,size) {
  return coreRequest({
    url: '/comment/CommentRepay/getCommentReList',
    method: 'GET',
    params:{
      commentId: commentId,
      page: page,
      size: size,
    }
  })
}



