import { getDefaultAxios } from "@/api/index.js";
const RES = "sql_wzxgfy";

/**
 * [wz_blxxb]确诊病例\出院
 * @params 具体取各字段含义后续再补,没时间搞
 */
export const wz_qzjcysj = async () => {
  const axios = getDefaultAxios();
  const params = ["hzxm", "xq", "xb", "bz", "xjjd", "dzzssj", "cysj", "lcyzcd", "xqmmc", "xqmwym", "xzbq"]
  const name = "wz_qzjcysj";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [wz_bqztb]出院
 */
export const wz_bqztb = async () => {
  const axios = getDefaultAxios();
  const params = ["blxx", "qx", "bqwzqk", "cysj"]
  const name = "wz_bqztb";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [wz_jdqdhbqb]乡镇街道红旗
 */
export const wz_jdqdhbqb = async () => {
  const axios = getDefaultAxios();
  const params = ["qx", "jd", "hbqqk", "hqzbq", "bqzhq"]
  const name = "(select * from wz_jdqdhbqb where gxsj = (select top 1 gxsj from wz_jdqdhbqb order by gxsj desc))";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [wz_jdqdhbqb]小区确诊病例统计[暂无]
 */
export const u_xqqzbltjb = async () => {
  const params = ["jd", "jd", "hbqqk", "hqzbq", "bqzhq"]
  const name = "wz_jdqdhbqb";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [wz_blxxb]热力图中的X.Y坐标数据
 */
export const wz_qzkjhzbb = async () => {
  const axios = getDefaultAxios();
  const params = ["sjc", "x", "y"]
  const name = "wz_qzkjhzbb";
  return await axios.post("/dw/ds", option_concat(name, params));
}

/**
 * [wz_sfxxbb]三返人员
 */
export const wz_sfxxbb = async () => {
  const axios = getDefaultAxios();
  const option = { "res": "sql_wzxgfy", "ds": [{ "dsid": "_", "schema": { "tables": [{ "alias": "a", "name": "wz_sfxxbb", "x": "0", "y": "0" }], "join": [], "cols": [{ "name": "主键", "field": "a.id", "type": "int" }, { "name": "qy_cnt", "field": "a.企业（工地）数量", "type": "string(50)" }, { "name": "ry_cnt", "field": "a.返工人员总数", "type": "string(50)" }, { "name": "wfxlw_cnt", "field": "a.未返乡留温", "type": "string(50)" }, { "name": "jhhw_cnt", "field": "a.计划回温", "type": "string(50)" }, { "name": "jhhwhb_cnt", "field": "a.计划回温人数（湖北籍）", "type": "string(50)" }, { "name": "jhhw3_cnt", "field": "a.未来3天计划返工人数", "type": "string(50)" }, { "name": "cgqf_cnt", "field": "a.成功劝返人数", "type": "string(50)" }, { "name": "cgqfhb_cnt", "field": "a.成功劝返人数（湖北籍）", "type": "string(50)" }, { "name": "AREA1", "field": "a.区县", "type": "string(50)" }, { "name": "AREA2", "field": "a.街道", "type": "string(50)" }, { "name": "DEPT_ID", "field": "a.编号", "type": "string(50)" }, { "name": "更新时间", "field": "a.gxsj", "type": "datetime" }], "wherejson": [{ "index": 1, "field": "a.id", "comp": "$eq", "param": "id" }, { "field": "a.区县", "comp": "$like", "value": "", "param": "AREA1", "index": 2 }, { "index": 3, "field": "a.街道", "comp": "$like", "value": "", "param": "AREA2" }], "groupby": [], "orderby": [{ "index": 1, "field": "a.id", "order": "asc" }], "update": {}, "params": [{ "name": "AREA1", "type": "", "info": "" }, { "name": "AREA2", "type": "", "info": "" }] }, "editor": {}, "params": {} }] };
  return await axios.post("/dw/datastores", option);
}

/**
 * 配置
 * @param {*} name 
 * @param {*} cols 
 * @param {*} where 
 * @param {*} count 
 */
const option_concat = (name, cols, where = "", count) => {
  const option = {
    module: "dwbean",
    action: "001",
    res: RES,
    ds: {
      buffers: [],
      tables: [{ alias: "f", orm: "", name, updateflag: 1 }],
      cols: cols.map(item => {
        return { name: item, raw: `f.${item}` }
      }),
      module: RES,
      where,
    }
  };
  count && (option.count = count);
  return option;
}