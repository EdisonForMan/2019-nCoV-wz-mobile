export const ddInit = async () => {
    dd.ready(function () {
        dd.env.platform !== "notInDingTalk" && dd.runtime.permission.requestAuthCode({
            corpId: "ding5d2dd335032d4436", // 企业id ding5d2dd335032d4436 ding73002ab2d25d865535c2f4657eb6378f
            onSuccess: function (info) {
                info && info.code && freeLogin(info.code)
            },
            onFail: function (err) {
                alert('免登授权获取失败！');
            }
        });
    });
}

const freeLogin = code => {
    // alert("[code]:" + code)
    $.ajax({
        url: "http://122.228.219.191:9888/api/sos/dingding/dingFreeLogin?code=" + code,
        type: 'post',
        dataType: 'json',
        success: function (res) {
            if (res.success) {
                let token = res.data.token;
                isLogin(token);
                return true;
            } else {
                alert(res.msg);
            }
        },
        error: function (error) {
            alert('网络超时1，请重试！' + JSON.stringify(error));
        },
    });
}

const isLogin = token => {
    // alert("[token]:" + token)
    $.ajax({
        url: "http://122.228.219.191:9888/api/sos/casclient/isLogin",
        type: 'post',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization: 'Bearer " + token + "'");
        },
        headers: { 'Content-Type': 'application/json;charset=utf8', 'Authorization': 'Bearer ' + token },
        dataType: 'json',
        success: function (res) {
            if (res.success) {
                let name = res.data.user.fullname;
                let mobile = res.data.user.mobile;
                let area = '';
                let isavailable = false;
                $.ajax({
                    type: "get", //请求方式
                    url: "http://lysb.lucheng.gov.cn/other/ddwz/data.json", //地址，就是json文件的请求路径
                    dataType: "json", //数据类型可以为 text xml json  script  jsonp
                    async: false,
                    success: function (data) { //返回的参数就是 action里面所有的有get和set方法的参数
                        var dataArrays = data.name_list;
                        for (let item of dataArrays) {
                            if (mobile == item.mobile) {
                                area = item.area;
                                isavailable = item.isavailable;
                                break;
                            }
                        }
                        if (isavailable) {
                            if (area != '') {
                                // alert('[area]:' + area)
                                window.ddArea = area;
                                dd.util.domainStorage.setItem({
                                    name: 'area', // 存储信息的key值
                                    value: area // 存储信息的Value值
                                });
                                // dd.util.domainStorage.getItem({
                                //     name: 'area', // 存储信息的keys值
                                //     onSuccess: function (info) {
                                //         alert('取出缓存：' + info.value)
                                //     },
                                //     onFail: function (err) {
                                //         alert('取出缓存失败：' + err)
                                //         // alert(JSON.stringify(err));
                                //     }
                                // });
                                return false;
                            }
                            else {
                                alert('当前账号的可查看区域为空')
                                return false;
                            }
                        }
                        else {
                            alert('当前账号不可用！')
                            return false;
                        }
                    },
                    error: function (error) {
                        alert('获取json文件失败！' + JSON.stringify(error));
                    },
                });
            } else {
                alert(res.msg);
            }
        },
        error: function (error) {
            alert('网络超时2，请重试！' + JSON.stringify(error));
        },
    });
}