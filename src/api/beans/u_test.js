import { getDefaultAxios } from "@/api/index.js";
/**
 * 疫情后台测试
 * @param {*} _option
 */
async function ds(_option = {}) {
  const axios = getDefaultAxios();
  const option = {
    module: "dwbean",
    action: "001",
    res: "testsql_all",
    count: 100,
    ds: JSON.stringify({
      buffers: [],
      tables: [
        {
          alias: "a",
          orm: "",
          name:
            "wz_mjry"
        }
      ],
      cols: [
        { name: "qxm", raw: "a.qxm", keyflag: 1 },
        { name: "jdm", raw: "a.jdm" }
      ],
      module: "testsql_all",
      where: "",
      wherejson: "",
      linkwhere: "",
      order: "rank",
      groupby: "",
      having: "",
      distinct: false,
      rowlimit: 0,
      childs: [],
      page: {},
      params: [],
      control: {},
      ..._option
    })
  };
  return await axios.post("/dw/ds", option);
}
const api = {
  ds
};

export default api;
