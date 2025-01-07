import { getToken, setToken, removeToken } from '@/utils/auth'
import { ref, computed } from 'vue'
import { getInfoContent } from '@/api/admin/content'
import { defineStore } from 'pinia'

const contentStore = defineStore(
  'content',()=>
  {
   
    const content = ref({
      id:undefined,
      articleId:undefined,
      authorId:undefined,
      content:undefined,
    })


    function decodeUnicode(text) {
      return text.replace(/\\u[\da-f]{4}/gi, function(match) {
        return String.fromCharCode(parseInt(match.substr(2), 16));
      });
    }

      
    const getContent = async (id) => {
        return await new  Promise (async (resolve, reject) => {
          await getInfoContent(
              id
            ).then((res) => {
                content.value ={
                  id:res.data.id,
                  articleId:res.data.articleId,
                  authorId:res.data.authorId,
                  content:decodeUnicode(res.data.content),
                }
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }


    return {
        content,
        getContent,
    }
  })

export default contentStore
