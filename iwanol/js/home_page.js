// JavaScript Document
$(function () {
        var $this = $("#mark");
        var scrollTimer;
        $this.hover(function () {
            clearInterval(scrollTimer);
        }, function () {
            scrollTimer = setInterval(function () {
                scrollNews($this);
            }, 5000);
        }).trigger("mouseout");
    });
    function scrollNews(obj) {
        var $self = obj.find("ul:first");
        var lineHeight = $self.find("li:first").height();
        $self.animate({ "margin-top": -lineHeight + "px" }, 900, function () {
            $self.css({ "margin-top": "0px" }).find("li:first").appendTo($self);
        })
    }
    function ShowNews(id) {
        jQuery('#dlg').dialog({
            title: '公告',
            href: '/users/shownews?id=' + id + '&t=' + Math.random(),
            width: 750,
            height: 355,
            modal: true
        });
    }
    function PostWait() {
        jQuery.messager.confirm('提示', '您确定立即发送吗?', function (r) {
            if (r) {
                var win = jQuery.messager.progress({
                    title: '发送订单..',
                    msg: '请等待...',
                    interval: 1000
                });

                var url = '/orders/sendall' + '?r=' + Math.random();
                jQuery.get(url, function (data) {
                    jQuery.messager.progress('close');
                    alert(data);
                    window.location.href = window.location.href; 
                });
            }
        })
    }
	
	 function Setleave(msg) {
        jQuery.messager.confirm('提示', msg, function (r) {
            if (r) {
                var url = '/users/setleave' + '?r=' + Math.random();
                window.location.href = url;
            }
        });
    }
    function RemoveQQ() {
        jQuery.messager.confirm('提示', '您确定删除客服QQ', function (r) {
            if (r) {
                var url = '/users/removeqq?r=' + Math.random();
                window.location.href = url;
            }
        });
    }
    function promptdlg() {
        jQuery.messager.prompt('游戏公告', '输入游戏公告或客服QQ，最多100个字\t\t', function (data) {
            if (data) {
                jQuery.post('/users/contactus', { qq: data }, function (m) {
                    if (m) {
                        alert(m);
                    }
                    else {
                        window.location.href = '/users/welcome';
                    }
                })
            }
        });
    }