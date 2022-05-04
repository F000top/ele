var my = {}
my.appName = "今日校园"
my.province = "山东省"      //填名称 一个字符不能错！
my.city = "淄博市"          //淄博市
my.county = "沂源县"         //沂源县
my.details = "XXXXXX"       //详细住址

//以下 不想自动按的写false
my.confirm = true               //本人是否承诺以上所填的全部内容属实、准确，不存在任何隐瞒与不实的情况？
my.reConfirm = true             //确认已认真查看，且填写信息无误的
my.isSubmit = true              //最后的提交按钮
my.temperature = "36-37.2℃"       //一个字符都不能错

my.jsVersion = "3.3.1.27"           //只点击当天的表单

my.isFinalSubmit = false        //针对最后的提交 默认false 不建议直接打开 最好检查一次后打开 打开就没有后悔的机会了  


console.show()
auto.waitFor()
log("查看是否打开无障碍权限")
sleep(500)

log("开始执行 版本" + my.jsVersion)
//开始
if (launchApp(my.appName)) {
    log("打开 app 等待进入主页")

    log("等待消息出现")
    text("消息").waitFor()
    sleep(500)

    if (text("消息").findOne().parent().parent().click()) {
        log("进入消息通知成功")
        sleep(500)
        if (text("辅导员通知").findOne().parent().parent().parent().parent().click()) {//我靠居然有四层
            log("进入辅导员通知成功")
            sleep(500)

            var objectWriting = textContains("未填写").find()
            if(objectWriting.length==0) {
                log("今天似乎没有未填写！")
                exit()
            }
            var writing=objectWriting[objectWriting.length-1]
                
            if (writing.parent().parent().parent().click()) {
                log("进入辅导猫成功")

                log("等待界面加载")
                text("请选择省或海外").waitFor()
                sleep(500)
                
                //页面操作
                auto1()
                log("1 搞定")
                auto2()
                log("2 搞定")
                sleep(1000)
                className("android.widget.EditText").findOne().setText(my.details)
                log("3 填写搞定")
                sleep(500)
                

                //温度
                if (text(my.temperature).findOne().click()) {
                    log("点击" + my.temperature + "成功")
                }
                else {
                    log("ok ge gui2")
                }
                sleep(200)

                var objectYes = className("android.widget.CheckBox").text("是").find()
                var objectNo = className("android.widget.CheckBox").text("否").find()
                objectNo.forEach(function (item, index) {
                    log(index)
                    if (item && index < 5) {
                        if (item.click()) {
                            sleep(200)
                            log("否 index=" + index + "点击成功")
                        }
                        else
                            log("fail")
                    }
                })
                //先这样写后期再修改
                objectYes.forEach(function (item, index) {
                    log(index)
                    if (item && index == 3 && my.confirm) {
                        if (item.click()) {
                            sleep(200)
                            log("confirm" + index + "点击成功")
                        }
                        else
                            log("fail")
                    }
                })
                sleep(200)
                //reConfirm
                if (my.reConfirm) {
                    text("确认已认真查看，且填写信息无误").findOne().click()
                    log("reConfirm点击成功")
                }
                sleep(200)
                if (my.isSubmit) {
                    text("提交").findOne().click()
                    log("isSubmit点击成功")
                }

                sleep(200)
                if (my.isFinalSubmit) {
                    className("android.widget.Button").text("提交").findOne().click()
                    log("isFinalSubmit点击成功")
                }

                log("脚本执行完毕")
                sleep(1000)
                console.hide()
            } else {
                log("access to 辅导猫 fail 请关闭应用重新打开")
                toast("access to 辅导猫 fail")
            }
        } else {
            log("access to 辅导猫 fail 请关闭应用重新打开脚本")
        }
    }
} else {
    log("open app fail")
}



function auto1() {
    sleep(500)
    if (text("请选择省或海外").findOne().parent().click()) {
        log("find success")
        sleep(200)
        if (text(my.province).findOne().click()) {
            log("click"+my.province+"success")
            sleep(1000)
        } else {
            log("find fail")
        }
        clickOk()
    } else {
        log("find fail")
    }
    
    sleep(200)
    if (text("请选择市或洲").findOne().parent().click()) {
        log("find success")
        if (text(my.city).findOne().click()) {
            log("click"+my.city+"success")
            sleep(1000)
        } else {
            log("find fail")
        }
        clickOk()
    } else {
        log("find fail")
    }
    sleep(200)
    if (text("请选择区/县或者国家").findOne().parent().click()) {
        log("find success")
        if (text(my.county).findOne().click()) {
            log("click"+my.county+"success")
            sleep(1000)
        } else {
            log("find fail")
        }
        clickOk()
    } else {
        log("find fail")
    }
}

function clickKey(key){

    className("android.widget.Button").text(key).findOne().click()
    sleep(1000)
}

function auto2() {
    sleep(500)
    if (text("请选择省或海外").findOne().parent().click()) {
        log("find success")
        clickKey(my.province)
        clickOk()
    } else {
        log("find fail")
    }
    sleep(200)
    if (text("请选择市或洲").findOne().parent().click()) {
        log("find success")
        clickKey(my.city)
        clickOk()
    } else {
        log("find fail")
    }
    sleep(200)
    if (text("请选择区/县或者国家").findOne().parent().click()) {
        log("find success")
        clickKey(my.county)
        clickOk()
    } else {
        log("find fail")
    }

}

function clickOk() {
    if (text("确认").findOne().click()) {
        log("ok success")
    } else {
        log("ok fail")
    }
    sleep(1000)
}