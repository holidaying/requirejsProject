define(['zepto', 'core', '../auth'], function($) {
    alert($);
	  W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            setTimeout(function() {
                if (data.type == 0) {
                    toUrl("./register.html");
                } else if (data.type == 1) {
                    toUrl("./register.html?teacherStyle=" + 1);
                } else if (data.type == 2) {
                    toUrl("./register.html?teacherStyle=" + 2);
                }
            }, Math.random() * 1000 + 2000)

        } else {
            setTimeout(function() {
                toUrl("register.html");
            }, Math.random() * 1000 + 2000)
        }
    }
    return {

        init: function() {
            document.getElementById("content").classList.add("appears");
            this.loadingData();
        },
        loadingData: function() {
            getResult("user/gettype", {
                openid: openid
            }, "callBackMobileGetTypekHandler");
        }
    };
    alert(W);
  
})
