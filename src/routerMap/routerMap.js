/**
 * 返回时对应的路由
 * a:b表示b后退为a
 * 用于确认后退时的关系，保证后退不渲染
 */
export default {
  'itemTypeList': 'itemList',
  'itemList': 'itemDetail',
  'itemDetail': 'courseTypeList',
  'courseTypeList': 'courseList',
  'courseList': 'courseDetail',
  
}