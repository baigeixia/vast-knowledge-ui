import { getusersearchinfoApi, addusersearchinfoApi, associatelistapi, getusersearchtrendingapi, rmHistoryapi, rmHistoryAllapi } from '@/api/search/searchinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const searchinfoAppStore = defineStore(
   'searchinfo', () => {


      const getusersearchinfo = async () => {
         const data = await getusersearchinfoApi()
         return data.data
      }

      const addusersearchinfo = async (query) => {
         const data = await addusersearchinfoApi(query)
         console.log('datadata', data.data);
         return data.data
      }
      const getusersearchtrending = async () => {
         const data = await getusersearchtrendingapi()
         return data.data
      }


      const rmHistory = async (id) => {
         await rmHistoryapi(id)
      }

      const rmHistoryAll = async () => {
         await rmHistoryAllapi()
      }


      const associatelist = async (text) => {
         const data = await associatelistapi(text)
         return data.data
      }
      
      return {
         getusersearchinfo,
         addusersearchinfo,
         getusersearchtrending,
         rmHistory,
         rmHistoryAll,
         associatelist,
      }
   })


export default searchinfoAppStore