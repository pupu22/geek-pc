import Bar from '@/components/Bar'
import './index.scss'
import { useState, useEffect, useMemo} from 'react'
function allocateItems(
    ls,
    len,
    colWidth
  ){
    /** 各个瀑布流的内容列表 */
    const arr = []
    /** 各个瀑布流的高度列表 */
    const heightArr = []
  
    // 初始化瀑布流的内容列表和高度列表
    for (let i = 0; i < len; i++) {
      arr.push([])
      heightArr.push(0)
    }
  
    /** 获取高度最小的流的索引值 */
    function getIndexOfMinHeightFlow() {
      let minH = Number.MAX_SAFE_INTEGER
      let minIndex = 0
      heightArr.forEach((h, index) => {
        if (h < minH) {
          minH = h
          minIndex = index
        }
      })
      return minIndex
    }
    function Create(url) {
        return new Promise((resolve, reject) => {
            let oimg = new Image();//创建img标签
            oimg.onload = () => {
                resolve([oimg.height, oimg.width])
            }
            oimg.onerror = () => {
                reject(`'${oimg}' is not find`)
            }
            oimg.src = url
        })
    }
    ls.forEach(imgsrc => {
        Create(imgsrc).then(res => {
            const index = getIndexOfMinHeightFlow()
            arr[index].push(imgsrc)
            let temp = res[1]/350
            heightArr[index] += res[0] /temp
        })
    })
    return arr
  }
const Home = () =>  {
    const imgList = useMemo(()=>{
        return ['https://pica.zhimg.com/v2-6b0d0b75d5c743d628f43aa19b98109b_r.jpg?source=1940ef5c',
        'https://img.zcool.cn/community/019e1760aa6ab711013f4720ffacc1.jpg@1280w_1l_2o_100sh.jpg',
        'https://image.9game.cn/2020/9/13/175850242.jpg',
        'https://rss.sfacg.com/web/account/images/avatars/app/2010/25/1c44687f-df90-432e-8d35-cf2f46d1665b.jpg',
        'https://filestorage.9917.cn/d/file/p/2020/09-28/aa010ae915f382ea20e8e55cb42fe108.jpg',
        'https://img.shoujiwan.com/upload/image/20201229/1609209793883552.png',
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.rUVejKHCnusjVhk2p11Q3wHaKe?pid=ImgDet&rs=1',
        'https://pica.zhimg.com/v2-6b0d0b75d5c743d628f43aa19b98109b_r.jpg?source=1940ef5c',
        'https://syimg.3dmgame.com/uploadimg/upload/image/20200928/20200928182149_29863.jpg',
        'https://ts1.cn.mm.bing.net/th/id/R-C.de96a943effbb5a98ef676bec47c1ca1?rik=nvP9O8O%2bCluqtA&riu=http%3a%2f%2fimg.18183.cn%2fuploads%2fallimg%2f210326%2f112-2103261F410.jpg&ehk=4dfGp%2buYkfJXrNMnW72C2K%2fiu6dzY8cHJkwu9qFk%2fSc%3d&risl=&pid=ImgRaw&r=0',
        'https://pica.zhimg.com/v2-6b0d0b75d5c743d628f43aa19b98109b_r.jpg?source=1940ef5c',
        'https://dl.bbs.9game.cn/attachments/forum/202008/26/154724lvwu4cau55yav7wu.jpg',
        'https://c-img.18183.com/images/2020/11/23/197e16b31bb7d2d209cbab22f09cb4d4.jpg@!18183',
        'https://img.zcool.cn/community/019e1760aa6ab711013f4720ffacc1.jpg@1280w_1l_2o_100sh.jpg',
        'https://rss.sfacg.com/web/account/images/avatars/app/2010/25/1c44687f-df90-432e-8d35-cf2f46d1665b.jpg']
    }, [])

    const [colList, setColList] = useState(
        allocateItems(imgList, 3, 100)
    )
    useEffect(() => {
        setColList(allocateItems(imgList, 3, 100))
      }, [imgList])
    
    return (
        <div className="masonry">
            <div className="column">
                {
                    colList[0].map((item, index) => {
                        return (<>
                            <img src={item} width={350} alt='钟离' key={index}></img>
                        </>)
                    })
                }
            </div>
            <div className="column">
                {
                    colList[1].map((item, index) => {
                        return (<>
                            <img src={item} width={350} alt='钟离' key={index}></img>
                        </>)
                    })
                }
            </div>
            <div className="column">
                {
                    colList[2].map((item, index) => {
                        return (<>
                            <img src={item} width={350} alt='钟离' key={index}></img>
                        </>)
                    })
                }
            </div>
        </div>
    )
}
export default Home