(function ($) {
    $.learuntab = {
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },
        refreshTab: function () {
            var currentId = $('.page-tabs-content').find('.active').attr('data-id');
            var target = $('.LRADMS_iframe[data-id="' + currentId + '"]');
            var url = target.attr('src');
            //$.loading(true);
            target.attr('src', url).load(function () {
                //$.loading(false);
            });
        },
        activeTab: function () {
            var currentId = $(this).data('id');
            if (!$(this).hasClass('active')) {
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == currentId) {
                        $(this).show().siblings('.LRADMS_iframe').hide();
                        return false;
                    }
                });
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $.learuntab.scrollToTab(this);
            }
        },
        closeOtherTabs: function () {
            $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function () {
                $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).remove();
            });
            $('.page-tabs-content').css("margin-left", "0");
        },
        closeTab: function () {
            var closeTabId = $(this).parents('.menuTab').data('id');
            var currentWidth = $(this).parents('.menuTab').width();
            if ($(this).parents('.menuTab').hasClass('active')) {
                if ($(this).parents('.menuTab').next('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').next('.menuTab:eq(0)').data('id');
                    $(this).parents('.menuTab').next('.menuTab:eq(0)').addClass('active');

                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                    if (marginLeftVal < 0) {
                        $('.page-tabs-content').animate({
                            marginLeft: (marginLeftVal + currentWidth) + 'px'
                        }, "fast");
                    }
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
                if ($(this).parents('.menuTab').prev('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').prev('.menuTab:last').data('id');
                    $(this).parents('.menuTab').prev('.menuTab:last').addClass('active');
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
            }
            else {
                $(this).parents('.menuTab').remove();
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        addTab: function () {
            $(".navbar-custom-menu>ul>li.open").removeClass("open");
            var dataId = $(this).attr('data-id');
            if (dataId != "") {
                //top.$.cookie('nfine_currentmoduleid', dataId, { path: "/" });
            }
            var dataUrl = $(this).attr('href');
            var menuName = $.trim($(this).text());
            var flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
                return false;
            }
            $('.menuTab').each(function () {
                if ($(this).data('id') == dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.menuTab').removeClass('active');
                        $.learuntab.scrollToTab(this);
                        $('.mainContent .LRADMS_iframe').each(function () {
                            if ($(this).data('id') == dataUrl) {
                                $(this).show().siblings('.LRADMS_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-remove"></i></a>';
                $('.menuTab').removeClass('active');
                var str1 = '<iframe class="LRADMS_iframe" id="iframe' + dataId + '" name="iframe' + dataId + '"  width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.mainContent').find('iframe.LRADMS_iframe').hide();
                $('.mainContent').append(str1);
                //$.loading(true);
                $('.mainContent iframe:visible').load(function () {
                    //$.loading(false);
                });
                $('.menuTabs .page-tabs-content').append(str);
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        scrollTabRight: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                if (scrollVal > 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: 0 - scrollVal + 'px'
                    }, "fast");
                }
            }
        },
        scrollTabLeft: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                if ($.learuntab.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                    while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).prev();
                    }
                    scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                }
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        scrollToTab: function (element) {
            var marginLeftVal = $.learuntab.calSumWidth($(element).prevAll()), marginRightVal = $.learuntab.calSumWidth($(element).nextAll());
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").outerWidth() < visibleWidth) {
                scrollVal = 0;
            } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
                if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                    scrollVal = marginLeftVal;
                    var tabElement = element;
                    while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                        scrollVal -= $(tabElement).prev().outerWidth();
                        tabElement = $(tabElement).prev();
                    }
                }
            } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
                scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        calSumWidth: function (element) {
            var width = 0;
            $(element).each(function () {
                width += $(this).outerWidth(true);
            });
            return width;
        },
        init: function () {
            $('.menuItem').on('click', $.learuntab.addTab);
            $('.menuTabs').on('click', '.menuTab i', $.learuntab.closeTab);
            $('.menuTabs').on('click', '.menuTab', $.learuntab.activeTab);
            $('.tabLeft').on('click', $.learuntab.scrollTabLeft);
            $('.tabRight').on('click', $.learuntab.scrollTabRight);
            $('.tabReload').on('click', $.learuntab.refreshTab);
            $('.tabCloseCurrent').on('click', function () {
                $('.page-tabs-content').find('.active i').trigger("click");
            });
            $('.tabCloseAll').on('click', function () {
                $('.page-tabs-content').children("[data-id]").find('.fa-remove').each(function () {
                    $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                    $(this).parents('a').remove();
                });
                $('.page-tabs-content').children("[data-id]:first").each(function () {
                    $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').show();
                    $(this).addClass("active");
                });
                $('.page-tabs-content').css("margin-left", "0");
            });
            $('.tabCloseOther').on('click', $.learuntab.closeOtherTabs);
            $('.fullscreen').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    $.learuntab.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen')
                    $.learuntab.exitFullscreen();
                }
            });
        }
    };
    $.learunindex = {
        load: function () {
            $("body").removeClass("hold-transition")
            $("#content-wrapper").find('.mainContent').height($(window).height() - 100);
            $(window).resize(function (e) {
                $("#content-wrapper").find('.mainContent').height($(window).height() - 100);
            });
            $(".sidebar-toggle").click(function () {
                if (!$("body").hasClass("sidebar-collapse")) {
                    $("body").addClass("sidebar-collapse");
                } else {
                    $("body").removeClass("sidebar-collapse");
                }
            })
            $(window).load(function () {
                window.setTimeout(function () {
                    $('#ajax-loader').fadeOut();
                }, 300);
            });
        },
        jsonWhere: function (data, action) {
            if (action == null) return;
            var reval = new Array();
            $(data).each(function (i, v) {
                if (action(v)) {
                    reval.push(v);
                }
            })
            return reval;
        },
        loadMenu: function () {
            var data = [
  {
    "F_ModuleId": "4",
    "F_ParentId": "0",
    "F_EnCode": "CommonInfo",
    "F_FullName": "订单管理",
    "F_Icon": "fa fa-briefcase",
    "F_UrlAddress": null,
    "F_Target": "expand",
    "F_IsMenu": 0,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 5,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "e35d24ce-8a6a-46b9-8b3f-6dc864a8f342",
    "F_ParentId": "4",
    "F_EnCode": "NewManage",
    "F_FullName": "订单管理",
    "F_Icon": "fa fa-feed",
    "F_UrlAddress": "prepaid_phone_orders.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 1,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "1",
    "F_ParentId": "0",
    "F_EnCode": "SysManage",
    "F_FullName": "账户管理",
    "F_Icon": "fa fa-desktop",
    "F_UrlAddress": null,
    "F_Target": "expand",
    "F_IsMenu": 0,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 1,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "7ae94059-9aa5-48eb-8330-4e2a6565b193",
    "F_ParentId": "1",
    "F_EnCode": "AreaManage",
    "F_FullName": "用户资料",
    "F_Icon": "fa fa-leaf",
    "F_UrlAddress": "subscriber_data.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 1,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "4efd37bf-e3ef-4ced-8248-58eba046d78b",
    "F_ParentId": "1",
    "F_EnCode": "DataItemManage",
    "F_FullName": "结算比率",
    "F_Icon": "fa fa-book",
    "F_UrlAddress": "js_rate.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 2,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "7adc5a16-54a4-408e-a101-2ddab8117d67",
    "F_ParentId": "1",
    "F_EnCode": "CodeRule",
    "F_FullName": "账户收支",
    "F_Icon": "fa fa-barcode",
    "F_UrlAddress": "zh_income.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
    "F_ParentId": "1",
    "F_EnCode": "Client_PaymentAccount",
    "F_FullName": "提现记录",
    "F_Icon": "fa fa-coffee",
    "F_UrlAddress": "tx_record.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 9,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
    "F_ParentId": "1",
    "F_EnCode": "Client_PaymentAccount",
    "F_FullName": "登录密码",
    "F_Icon": "fa fa-shopping-bag",
    "F_UrlAddress": "login_password.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 9,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
    "F_ParentId": "1",
    "F_EnCode": "Client_PaymentAccount",
    "F_FullName": "账户安全",
    "F_Icon": "fa fa-binoculars",
    "F_UrlAddress": "account_security.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 9,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
    "F_ParentId": "1",
    "F_EnCode": "Client_PaymentAccount",
    "F_FullName": "通讯密匙",
    "F_Icon": "fa fa-wrench",
    "F_UrlAddress": "tx_key.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 9,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
    "F_ParentId": "1",
    "F_EnCode": "Client_PaymentAccount",
    "F_FullName": "登录日志",
    "F_Icon": "fa fa-send",
    "F_UrlAddress": "register_log.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 9,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    
  {
    "F_ModuleId": "5",
    "F_ParentId": "0",
    "F_EnCode": "FlowManage",
    "F_FullName": "控制面板",
    "F_Icon": "fa fa-share-alt",
    "F_UrlAddress": null,
    "F_Target": "expand",
    "F_IsMenu": 0,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "1b642904-d674-495f-a1e1-4814cc543870",
    "F_ParentId": "5",
    "F_EnCode": "分区模板",
    "F_FullName": "分区模板",
    "F_Icon": "fa fa-edit",
    "F_UrlAddress": "zones_tencil.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 1,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "691f3810-a602-4523-8518-ce5856482d48",
    "F_ParentId": "5",
    "F_EnCode": "安装分区",
    "F_FullName": "安装分区",
    "F_Icon": "fa fa-file-text-o",
    "F_UrlAddress": "install_zone.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 2,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "1d3797f6-5cd2-41bc-b769-27f2513d61a9",
    "F_ParentId": "5",
    "F_EnCode": "ClientInfoManage",
    "F_FullName": "分区管理",
    "F_Icon": "fa fa-suitcase",
    "F_UrlAddress": "partitioned_management.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "66f6301c-1789-4525-a7d2-2b83272aafa6",
    "F_ParentId": "5",
    "F_EnCode": "ClientChance",
    "F_FullName": "分组管理",
    "F_Icon": "fa fa-binoculars",
    "F_UrlAddress": "grouping_management.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 2,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "affacee1-41a3-4c7b-8804-f1c1926babbd",
    "F_ParentId": "5",
    "F_EnCode": "PurchaseReport",
    "F_FullName": "手动充值",
    "F_Icon": "fa fa-bar-chart",
    "F_UrlAddress": "sd_recharge.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 2,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "52fe82f8-41ba-433e-9351-ef67e5b35217",
    "F_ParentId": "5",
    "F_EnCode": "Client_Level",
    "F_FullName": "整区补发",
    "F_Icon": "fa fa-random",
    "F_UrlAddress": "zq_reissue.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 5,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "b352f049-4331-4b19-ac22-e379cb30bd55",
    "F_ParentId": "5",
    "F_EnCode": "ClientOrder",
    "F_FullName": "补发记录",
    "F_Icon": "fa fa-modx",
    "F_UrlAddress": "bf_record.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 5,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
    {
    "F_ModuleId": "535d92e9-e066-406c-b2c2-697150a5bdff",
    "F_ParentId": "5",
    "F_EnCode": "ClienReceivable",
    "F_FullName": "下载网关",
    "F_Icon": "fa fa-money",
    "F_UrlAddress": "down_list.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 6,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "1ef31fba-7f0a-46f7-b533-49dd0c2e51e0",
    "F_ParentId": "5",
    "F_EnCode": "ClienReceivableReport",
    "F_FullName": "通讯密匙",
    "F_Icon": "fa fa-bar-chart",
    "F_UrlAddress": "tx_key.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 7,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "80620d6f-55bd-492b-9c21-1b04ca268e75",
    "F_ParentId": "5",
    "F_EnCode": "Client_ChancePhase",
    "F_FullName": "获取代码",
    "F_Icon": "fa fa-tag",
    "F_UrlAddress": "get_code.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 0,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 7,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
  {
    "F_ModuleId": "22",
    "F_ParentId": "0",
    "F_EnCode": "CommonInfo",
    "F_FullName": "统计分析",
    "F_Icon": "fa fa-jsfiddle",
    "F_UrlAddress": null,
    "F_Target": "expand",
    "F_IsMenu": 0,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 5,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "分区统计",
    "F_Icon": "fa fa-clipboard",
    "F_UrlAddress": "zonal_tj.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "充值渠道统计",
    "F_Icon": "fa  fa-file",
    "F_UrlAddress": "channels_tj.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "分组统计",
    "F_Icon": "fa  fa-list",
    "F_UrlAddress": "group_tj.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "时段统计",
    "F_Icon": "fa fa-hand-o-up",
    "F_UrlAddress": "time_tj.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "IPS来源统计",
    "F_Icon": "fa  fa-line-chart",
    "F_UrlAddress": "ips_tj.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "充值排行",
    "F_Icon": "fa  fa-calculator",
    "F_UrlAddress": "recharge_ph.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
   {
    "F_ModuleId": "04b88c96-8d99-45ec-956c-444efa630020",
    "F_ParentId": "22",
    "F_EnCode": "ResourceFileManage",
    "F_FullName": "发布站流量统计",
    "F_Icon": "fa  fa-check-square-o",
    "F_UrlAddress": "flow_tj.html",
    "F_Target": "iframe",
    "F_IsMenu": 1,
    "F_AllowExpand": 1,
    "F_IsPublic": 0,
    "F_AllowEdit": null,
    "F_AllowDelete": null,
    "F_SortCode": 3,
    "F_DeleteMark": 0,
    "F_EnabledMark": 1
  },
	  {
		    "F_ModuleId": "2",
		    "F_ParentId": "0",
		    "F_EnCode": "BaseManage",
		    "F_FullName": "代理系统",
		    "F_Icon": "fa fa-coffee",
		    "F_UrlAddress": null,
		    "F_Target": "expand",
		    "F_IsMenu": 0,
		    "F_AllowExpand": 1,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 2,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		  {
		    "F_ModuleId": "8",
		    "F_ParentId": "2",
		    "F_EnCode": "OrganizeManage",
		    "F_FullName": "网站设置",
		    "F_Icon": "fa fa-sitemap",
		    "F_UrlAddress": "sites_set.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 1,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 1,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
			  {
		    "F_ModuleId": "9",
		    "F_ParentId": "2",
		    "F_EnCode": "DepartmentManage",
		    "F_FullName": "用户分组",
		    "F_Icon": "fa fa-th-list",
		    "F_UrlAddress": "user_groups.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 1,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 2,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		    {
		    "F_ModuleId": "11",
		    "F_ParentId": "2",
		    "F_EnCode": "RoleManage",
		    "F_FullName": "添加商户",
		    "F_Icon": "fa fa-paw",
		    "F_UrlAddress": "add_merchants.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 1,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 3,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		    {
		    "F_ModuleId": "13",
		    "F_ParentId": "2",
		    "F_EnCode": "PostManage",
		    "F_FullName": "下属商户",
		    "F_Icon": "fa fa-graduation-cap",
		    "F_UrlAddress": "puisne_sh.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 1,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 5,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		    {
		    "F_ModuleId": "12",
		    "F_ParentId": "2",
		    "F_EnCode": "JobManage",
		    "F_FullName": "订单查询",
		    "F_Icon": "fa fa-briefcase",
		    "F_UrlAddress": "indent_refer.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 1,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 6,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		    {
		    "F_ModuleId": "77f13de5-32ad-4226-9e24-f1db507e78cb",
		    "F_ParentId": "2",
		    "F_EnCode": "Client_PaymentMode",
		    "F_FullName": "扣单记录",
		    "F_Icon": "fa fa-paw",
		    "F_UrlAddress": "kd_record.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 0,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 8,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		  {
		    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
		    "F_ParentId": "2",
		    "F_EnCode": "Client_PaymentAccount",
		    "F_FullName": "分区管理",
		    "F_Icon": "fa fa-graduation-cap",
		    "F_UrlAddress": "#",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 0,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 9,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  },
		  {
		    "F_ModuleId": "62af0605-4558-47b1-9530-bc3515036b37",
		    "F_ParentId": "2",
		    "F_EnCode": "Client_PaymentAccount",
		    "F_FullName": "数据统计",
		    "F_Icon": "fa fa-briefcase",
		    "F_UrlAddress": "statistic_analysis.html",
		    "F_Target": "iframe",
		    "F_IsMenu": 1,
		    "F_AllowExpand": 0,
		    "F_IsPublic": 0,
		    "F_AllowEdit": null,
		    "F_AllowDelete": null,
		    "F_SortCode": 9,
		    "F_DeleteMark": 0,
		    "F_EnabledMark": 1
		  }
];

            var _html = "";
            $.each(data, function (i) {
                var row = data[i];
                if (row.F_ParentId == "0") {
                    if (i == 0) {
                        _html += '<li class="treeview">';
                    } else {
                        _html += '<li class="treeview">';
                    }
                    _html += '<a href="#">'
                    _html += '<i class="' + row.F_Icon + '"></i><span>' + row.F_FullName + '</span><i class="fa fa-angle-left pull-right"></i>'
                    _html += '</a>'
                    var childNodes = $.learunindex.jsonWhere(data, function (v) { return v.F_ParentId == row.F_ModuleId });
                    if (childNodes.length > 0) {
                        _html += '<ul class="treeview-menu">';
                        $.each(childNodes, function (i) {
                            var subrow = childNodes[i];
                            var subchildNodes = $.learunindex.jsonWhere(data, function (v) { return v.F_ParentId == subrow.F_ModuleId });
                            _html += '<li>';
                            if (subchildNodes.length > 0) {
                                _html += '<a href="#"><i class="' + subrow.F_Icon + '"></i>' + subrow.F_FullName + '';
                                _html += '<i class="fa fa-angle-left pull-right"></i></a>';
                                _html += '<ul class="treeview-menu">';
                                $.each(subchildNodes, function (i) {
                                    var subchildNodesrow = subchildNodes[i];
                                    _html += '<li><a class="menuItem" data-id="' + subrow.F_ModuleId + '" href="' + subrow.F_UrlAddress + '"><i class="' + subchildNodesrow.F_Icon + '"></i>' + subchildNodesrow.F_FullName + '</a></li>';
                                });
                                _html += '</ul>';

                            } else {
                                _html += '<a class="menuItem" data-id="' + subrow.F_ModuleId + '" href="' + subrow.F_UrlAddress + '"><i class="' + subrow.F_Icon + '"></i>' + subrow.F_FullName + '</a>';
                            }
                            _html += '</li>';
                        });
                        _html += '</ul>';
                    }
                    _html += '</li>'
                }
            });
            $("#sidebar-menu").append(_html);
            $("#sidebar-menu li a").click(function () {
                var d = $(this), e = d.next();
                if (e.is(".treeview-menu") && e.is(":visible")) {
                    e.slideUp(500, function () {
                        e.removeClass("menu-open")
                    }),
                    e.parent("li").removeClass("active")
                } else if (e.is(".treeview-menu") && !e.is(":visible")) {
                    var f = d.parents("ul").first(),
                    g = f.find("ul:visible").slideUp(500);
                    g.removeClass("menu-open");
                    var h = d.parent("li");
                    e.slideDown(500, function () {
                        e.addClass("menu-open"),
                        f.find("li.active").removeClass("active"),
                        h.addClass("active");

                        var _height1 = $(window).height() - $("#sidebar-menu >li.active").position().top - 41;
                        var _height2 = $("#sidebar-menu li > ul.menu-open").height() + 10
                        if (_height2 > _height1) {
                            $("#sidebar-menu >li > ul.menu-open").css({
                                overflow: "auto",
                                height: _height1
                            })
                        }
                    })
                }
                e.is(".treeview-menu");
            });
        }
    };
    $(function () {
        $.learunindex.load();
        $.learunindex.loadMenu();
        $.learuntab.init();
    });
})(jQuery);