
function ajaxRequest() {
    // 1、我们首先要创建XMLHttpRequest
    var xmlhttprequest = new XMLHttpRequest();
    //2、调用open方法设置请求参数
    xmlhttprequest.open("GET", "http://localhost:8080/16_json_ajax_i18n/ajaxServlet?action=javaScriptAjax?aa=11", true);
    //4、在send方法前绑定onreadystatechange事件，处理请求完成后的操作。
    xmlhttprequest.onreadystatechange = function () {
        if (xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200) {
            var jsonObj = JSON.parse(xmlhttprequest.responseText);
            console.log(jsonObj)
        }
    }
    // 3、调用send方法发送请求
    xmlhttprequest.send();
}
