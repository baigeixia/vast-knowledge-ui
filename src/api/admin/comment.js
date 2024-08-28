import { coreRequest } from '@/utils/request'

export function saveComment(type,channelId,entryId,content,image,arAuthorId) {
    return coreRequest({
      url: '/comment/Comment/saveComment',
      method: 'POST',
      data:{
        type: type,
        channelId: channelId,
        entryId: entryId,
        content: content,
        image: image,
        arAuthorId: arAuthorId,
      }
    })
}

export function saveCommentRe(commentId,commentRepayId,content,image,repayAuthorId) {
  return coreRequest({
    url: '/comment/CommentRepay/saveCommentRe',
    method: 'POST',
    data:{
      commentRepayId: commentRepayId,
      commentId: commentId,
      content: content,
      image: image,
      repayAuthorId: repayAuthorId,
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


export function getCommentReList(type,commentId,page,size) {
  return coreRequest({
    url: '/comment/CommentRepay/getCommentReList',
    method: 'GET',
    params:{
      type:type,
      commentId: commentId,
      page: page,
      size: size,
    }
  })
}



