import { getDefaultAxios } from "@/api/index.js";
const RES = "sql_wzxgfy";

/**
 * [wz_blxxb]确诊病例\出院
 * @params 具体取各字段含义后续再补,没时间搞
 */
export const wz_qzjcysj = async () => {
  const axios = getDefaultAxios();
  const params = ["hzxm", "xq", "xb", "bz", "xjjd", "dzzssj", "cysj", "lcyzcd", "xqmmc"]
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