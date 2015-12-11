!function(n){"use strict";var e=function(){var e=this;n(document).ready(function(){e.initialize()})},a=e.prototype;e.SCREEN_XS=480,e.SCREEN_SM=768,e.SCREEN_MD=992,e.SCREEN_LG=1200,a._callFunctions=null,a._resizeTimer=null,a.initialize=function(){this._enableEvents(),this._initBreakpoints(),this._initInk(),this._initAccordion()},a._enableEvents=function(){var e=this;n(window).on("resize",function(n){clearTimeout(e._resizeTimer),e._resizeTimer=setTimeout(function(){e._handleFunctionCalls(n)},300)})},a.getKnobStyle=function(e){var a=e.closest(".knob"),i={width:Math.floor(a.outerWidth()),height:Math.floor(a.outerHeight()),fgColor:a.css("color"),bgColor:a.css("border-top-color"),draw:function(){e.data("percentage")&&n(this.i).val(this.cv+"%")}};return i},a._initAccordion=function(){n(".panel-group .card .in").each(function(){var e=n(this).parent();e.addClass("expanded")}),n(".panel-group").on("hide.bs.collapse",function(e){var a=n(e.target),i=a.parent();i.removeClass("expanded")}),n(".panel-group").on("show.bs.collapse",function(e){var a=n(e.target),i=a.parent(),t=i.closest(".panel-group");t.find(".card.expanded").removeClass("expanded"),i.addClass("expanded")})},a._initInk=function(){var e=this;n(".ink-reaction").on("click",function(a){var i=n(this).get(0).getBoundingClientRect(),t=(a.clientX-i.left,a.clientY-i.top,e.getBackground(n(this))),o=e.getLuma(t)>183?" inverse":"",r=n('<div class="ink'+o+'"></div>'),s=n(this).offset(),l=a.pageX-s.left,c=a.pageY-s.top;r.css({top:c,left:l}).appendTo(n(this)),window.setTimeout(function(){r.remove()},1500)})},a.getBackground=function(n){var e=n.css("background-color"),a=parseFloat(e.split(",")[3],10);return isNaN(a)||a>.8?e:n.is("body")?!1:this.getBackground(n.parent())},a.getLuma=function(n){var e=n.substring(4,n.length-1).split(","),a=e[0],i=e[1],t=e[2],o=.2126*a+.7152*i+.0722*t;return o},a._initBreakpoints=function(){var e="";e+='<div id="device-breakpoints">',e+='<div class="device-xs visible-xs" data-breakpoint="xs"></div>',e+='<div class="device-sm visible-sm" data-breakpoint="sm"></div>',e+='<div class="device-md visible-md" data-breakpoint="md"></div>',e+='<div class="device-lg visible-lg" data-breakpoint="lg"></div>',e+="</div>",n("body").append(e)},a.isBreakpoint=function(e){return n(".device-"+e).is(":visible")},a.minBreakpoint=function(e){var a=["xs","sm","md","lg"],i=n("#device-breakpoints div:visible").data("breakpoint");return n.inArray(e,a)<n.inArray(i,a)},a.callOnResize=function(n){null===this._callFunctions&&(this._callFunctions=[]),this._callFunctions.push(n),n.call()},a._handleFunctionCalls=function(){if(null!==this._callFunctions)for(var n=0;n<this._callFunctions.length;n++)this._callFunctions[n].call()},window.materialadmin=window.materialadmin||{},window.materialadmin.App=new e}(jQuery),function(n,e){"use strict";var a=function(){var n=this;e(document).ready(function(){n.initialize()})},i=a.prototype;a.MENU_MAXIMIZED=1,a.MENU_COLLAPSED=2,a.MENU_HIDDEN=3,i._lastOpened=null,i.initialize=function(){this._enableEvents(),this._invalidateMenu(),this._evalMenuScrollbar()},i._enableEvents=function(){var n=this;e(window).on("resize",function(e){n._handleScreenSize(e)}),e("body.menubar-hoverable").on("mouseenter","#menubar",function(){n._handleMenubarEnter()}),e('[data-toggle="menubar"]').on("click",function(e){n._handleMenuToggleClick(e)}),e('[data-dismiss="menubar"]').on("click",function(){n._handleMenubarLeave()}),e("#main-menu").on("click","li",function(e){n._handleMenuItemClick(e)}),e("#main-menu").on("click","a",function(e){n._handleMenuLinkClick(e)})},i._handleScreenSize=function(n){this._invalidateMenu(),this._evalMenuScrollbar(n)},i._handleMenuToggleClick=function(){materialadmin.App.isBreakpoint("xs")||e("body").toggleClass("menubar-pin");var n=this.getMenuState();n===a.MENU_COLLAPSED?this._handleMenubarEnter():n===a.MENU_MAXIMIZED?this._handleMenubarLeave():n===a.MENU_HIDDEN&&this._handleMenubarEnter()},i._handleMenuItemClick=function(n){n.stopPropagation();var a=e(n.currentTarget),i=a.find("> ul"),t=a.closest("ul");this._handleMenubarEnter(a),0!==i.children().length&&(this._closeSubMenu(t),i.is(":visible")||this._openSubMenu(a))},i._handleMenubarEnter=function(n){var a=this,i=e("body").hasClass("offcanvas-left-expanded"),t=e("#menubar").data("expanded"),o=void 0!==n;if((o===!0||i===!1)&&t!==!0&&(e("#content").one("mouseover",function(){a._handleMenubarLeave()}),e("body").addClass("menubar-visible"),e("#menubar").data("expanded",!0),e("#menubar").triggerHandler("enter"),o===!1))if(this._lastOpened){var a=this;this._openSubMenu(this._lastOpened,0),this._lastOpened.parents(".gui-folder").each(function(){a._openSubMenu(e(this),0)})}else{var r=e("#main-menu > li.active");this._openSubMenu(r,0)}},i._handleMenubarLeave=function(){e("body").removeClass("menubar-visible"),materialadmin.App.minBreakpoint("md")&&e("body").hasClass("menubar-pin")||(e("#menubar").data("expanded",!1),materialadmin.App.isBreakpoint("xs")===!1&&this._closeSubMenu(e("#main-menu")))},i._handleMenuLinkClick=function(n){var a=e("body").hasClass("menubar-pin")&&materialadmin.App.minBreakpoint("md"),i=e("#menubar").data("expanded");i===!1&&a===!1&&n.preventDefault()},i._closeSubMenu=function(n){var a=this;n.find("> li > ul").stop().slideUp(170,function(){e(this).closest("li").removeClass("expanded"),a._evalMenuScrollbar()})},i._openSubMenu=function(n,a){var i=this;"undefined"==typeof a&&(a=170),this._lastOpened=n,n.addClass("expanding"),n.find("> ul").stop().slideDown(a,function(){n.addClass("expanded"),n.removeClass("expanding"),i._evalMenuScrollbar(),e("#main-menu ul").removeAttr("style")})},i._invalidateMenu=function(){var n=e("#main-menu a.active");n.parentsUntil(e("#main-menu")).each(function(){e(this).is("li")&&(e(this).addClass("active"),e(this).addClass("expanded"))}),this.getMenuState()===a.MENU_COLLAPSED&&e("#main-menu").find("> li").removeClass("expanded"),e("body").hasClass("menubar-visible")&&this._handleMenubarEnter(),e("#main-menu").triggerHandler("ready")},i.getMenuState=function(){var n=e("#menubar").css("transform"),i=n?n.match(/-?[\d\.]+/g):null,t=a.MENU_MAXIMIZED;return t=null===i?e("#menubar").width()<=65?a.MENU_COLLAPSED:a.MENU_MAXIMIZED:"0"===i[4]?a.MENU_MAXIMIZED:a.MENU_HIDDEN},i._evalMenuScrollbar=function(){if(e.isFunction(e.fn.nanoScroller)){var n=e("#menubar");if(0!==n.length){var a=e(".menubar-scroll-panel"),i=a.parent();i.hasClass("nano-content")===!1&&a.wrap('<div class="nano"><div class="nano-content"></div></div>');var t=e(window).height()-n.position().top-n.find(".nano").position().top,o=a.closest(".nano");o.css({height:t}),o.nanoScroller({preventPageScrolling:!0})}}},window.materialadmin.AppNavigation=new a}(this.materialadmin,jQuery),function(n,e){"use strict";var a=function(){var n=this;e(document).ready(function(){n.initialize()})},i=a.prototype;i._timer=null,i._useBackdrop=null,i.initialize=function(){this._enableEvents()},i._enableEvents=function(){var n=this;e(window).on("resize",function(e){n._handleScreenSize(e)}),e(".offcanvas").on("refresh",function(e){n.evalScrollbar(e)}),e('[data-toggle="offcanvas"]').on("click",function(a){a.preventDefault(),n._handleOffcanvasOpen(e(a.currentTarget))}),e('[data-dismiss="offcanvas"]').on("click",function(){n._handleOffcanvasClose()}),e("#base").on("click","> .backdrop",function(){n._handleOffcanvasClose()}),e('[data-toggle="offcanvas-left"].active').each(function(){n._handleOffcanvasOpen(e(this))}),e('[data-toggle="offcanvas-right"].active').each(function(){n._handleOffcanvasOpen(e(this))})},i._handleScreenSize=function(n){this.evalScrollbar(n)},i._handleOffcanvasOpen=function(n){if(n.hasClass("active"))return void this._handleOffcanvasClose();var e=n.attr("href");this._useBackdrop=void 0===n.data("backdrop")?!0:n.data("backdrop"),this.openOffcanvas(e),this.invalidate()},i._handleOffcanvasClose=function(){this.closeOffcanvas(),this.invalidate()},i.openOffcanvas=function(n){this.closeOffcanvas(),e(n).addClass("active");var a=e(n).closest(".offcanvas:first").length>0;this._useBackdrop&&e("body").addClass("offcanvas-expanded");var i=e(n).width();i>e(document).width()&&(i=e(document).width()-8,e(n+".active").css({width:i})),i=a?i:"-"+i;var t="translate("+i+"px, 0)";e(n+".active").css({"-webkit-transform":t,"-ms-transform":t,"-o-transform":t,transform:t})},i.closeOffcanvas=function(){e('[data-toggle="offcanvas"]').removeClass("expanded"),e(".offcanvas-pane").removeClass("active"),e(".offcanvas-pane").css({"-webkit-transform":"","-ms-transform":"","-o-transform":"",transform:""})},i.toggleButtonState=function(){var n=e(".offcanvas-pane.active").attr("id");e('[data-toggle="offcanvas"]').removeClass("active"),e('[href="#'+n+'"]').addClass("active")},i.toggleBackdropState=function(){e(".offcanvas-pane.active").length>0&&this._useBackdrop?this._addBackdrop():this._removeBackdrop()},i._addBackdrop=function(){0===e("#base > .backdrop").length&&"hidden"!==e("#base").data("backdrop")&&e('<div class="backdrop"></div>').hide().appendTo("#base").fadeIn()},i._removeBackdrop=function(){e("#base > .backdrop").fadeOut(function(){e(this).remove()})},i.toggleBodyScrolling=function(){if(clearTimeout(this._timer),e(".offcanvas-pane.active").length>0&&this._useBackdrop){var n=this.measureScrollbar(),a=parseInt(e("body").css("padding-right")||0,10);n!==a&&(e("body").css("padding-right",a+n),e(".headerbar").css("padding-right",a+n))}else this._timer=setTimeout(function(){e("body").removeClass("offcanvas-expanded"),e("body").css("padding-right",""),e(".headerbar").removeClass("offcanvas-expanded"),e(".headerbar").css("padding-right","")},330)},i.invalidate=function(){this.toggleButtonState(),this.toggleBackdropState(),this.toggleBodyScrolling(),this.evalScrollbar()},i.evalScrollbar=function(){if(e.isFunction(e.fn.nanoScroller)){var n=e(".offcanvas-pane.active");if(0!==n.length){var a=e(".offcanvas-pane.active .offcanvas-body"),i=a.parent();i.hasClass("nano-content")===!1&&a.wrap('<div class="nano"><div class="nano-content"></div></div>');var t=e(window).height()-n.find(".nano").position().top,o=a.closest(".nano");o.css({height:t}),o.nanoScroller({preventPageScrolling:!0})}}},i.measureScrollbar=function(){var n=document.createElement("div");n.className="modal-scrollbar-measure",e("body").append(n);var a=n.offsetWidth-n.clientWidth;return e("body")[0].removeChild(n),a},window.materialadmin.AppOffcanvas=new a}(this.materialadmin,jQuery),function(n,e){"use strict";var a=function(){var n=this;e(document).ready(function(){n.initialize()})},i=a.prototype;i.initialize=function(){},i.addCardLoader=function(n){var a=e('<div class="card-loader"></div>').appendTo(n);a.hide().fadeIn();var i={lines:17,length:0,width:3,radius:6,corners:1,rotate:13,direction:1,color:"#000",speed:2,trail:76,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9,top:"auto",left:"auto"},t=new Spinner(i).spin(a.get(0));n.data("card-spinner",t)},i.removeCardLoader=function(n){var e=n.data("card-spinner"),a=n.find(".card-loader");a.fadeOut(function(){e.stop(),a.remove()})},i.toggleCardCollapse=function(n,a){a="undefined"!=typeof a?a:400;var i=!1;n.find(".nano").slideToggle(a),n.find(".card-body").slideToggle(a,function(){i===!1&&(e("#COLLAPSER").triggerHandler("card.bb.collapse",[!e(this).is(":visible")]),i=!0)}),n.toggleClass("card-collapsed")},i.removeCard=function(n){n.fadeOut(function(){n.remove()})},window.materialadmin.AppCard=new a}(this.materialadmin,jQuery),function(n,e){"use strict";var a=function(){var n=this;e(document).ready(function(){n.initialize()})},i=a.prototype;i.initialize=function(){this._enableEvents(),this._initRadioAndCheckbox(),this._initFloatingLabels(),this._initValidation()},i._enableEvents=function(){e('[data-submit="form"]').on("click",function(n){n.preventDefault();var a=e(n.currentTarget).attr("href");e(a).submit()}),e("textarea.autosize").on("focus",function(){e(this).autosize({append:""})})},i._initRadioAndCheckbox=function(){e(".checkbox-styled input, .radio-styled input").each(function(){0===e(this).next("span").length&&e(this).after("<span></span>")})},i._initFloatingLabels=function(){e(".floating-label .form-control").on("keyup change",function(n){var a=e(n.currentTarget);""!==e.trim(a.val())?a.addClass("dirty").removeClass("static"):a.removeClass("dirty").removeClass("static")}),e(".floating-label .form-control").each(function(){var n=e(this);""!==e.trim(n.val())&&n.addClass("static").addClass("dirty")}),e(".form-horizontal .form-control").each(function(){e(this).after('<div class="form-control-line"></div>')})},i._initValidation=function(){e.isFunction(e.fn.validate)&&(e.validator.setDefaults({highlight:function(n){e(n).closest(".form-group").addClass("has-error")},unhighlight:function(n){e(n).closest(".form-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(n,e){n.insertAfter(e.parent(".input-group").length?e.parent():e.parent("label").length?e.parent():e)}}),e(".form-validate").each(function(){var n=e(this).validate();e(this).data("validator",n)}))},window.materialadmin.AppForm=new a}(this.materialadmin,jQuery),function(n,e){"use strict";var a=function(){var n=this;e(document).ready(function(){n.initialize()})},i=a.prototype;i._clearSearchTimer=null,i.initialize=function(){this._enableEvents()},i._enableEvents=function(){var n=this;e(".navbar-search .btn").on("click",function(e){n._handleButtonClick(e)}),e(".navbar-search input").on("blur",function(e){n._handleFieldBlur(e)})},i._handleButtonClick=function(n){n.preventDefault();var a=e(n.currentTarget).closest("form"),i=a.find("input"),t=i.val();""===e.trim(t)?(a.addClass("expanded"),i.focus()):(a.addClass("expanded"),a.submit(),clearTimeout(this._clearSearchTimer))},i._handleFieldBlur=function(n){var a=e(n.currentTarget),i=a.closest("form");i.removeClass("expanded"),clearTimeout(this._clearSearchTimer),this._clearSearchTimer=setTimeout(function(){a.val("")},300)},window.materialadmin.AppNavSearch=new a}(this.materialadmin,jQuery),function(n,e){"use strict";var a=function(){var n=this;e(document).ready(function(){n.initialize()})},i=a.prototype;i.initialize=function(){this._initScroller(),this._initTabs(),this._initTooltips(),this._initPopover(),this._initSortables()},i._initScroller=function(){e.isFunction(e.fn.nanoScroller)&&(e.each(e(".scroll"),function(){var n=e(this);materialadmin.AppVendor.addScroller(n)}),materialadmin.App.callOnResize(function(){e.each(e(".scroll-xs"),function(){var n=e(this);n.is(":visible")&&(materialadmin.App.minBreakpoint("xs")?materialadmin.AppVendor.removeScroller(n):materialadmin.AppVendor.addScroller(n))}),e.each(e(".scroll-sm"),function(){var n=e(this);n.is(":visible")&&(materialadmin.App.minBreakpoint("sm")?materialadmin.AppVendor.removeScroller(n):materialadmin.AppVendor.addScroller(n))}),e.each(e(".scroll-md"),function(){var n=e(this);n.is(":visible")&&(materialadmin.App.minBreakpoint("md")?materialadmin.AppVendor.removeScroller(n):materialadmin.AppVendor.addScroller(n))}),e.each(e(".scroll-lg"),function(){var n=e(this);n.is(":visible")&&(materialadmin.App.minBreakpoint("lg")?materialadmin.AppVendor.removeScroller(n):materialadmin.AppVendor.addScroller(n))})}))},i.addScroller=function(n){n.wrap('<div class="nano"><div class="nano-content"></div></div>');var e=n.closest(".nano");e.css({height:n.outerHeight()}),e.nanoScroller(),n.css({height:"auto"})},i.removeScroller=function(n){n.parent().parent().hasClass("nano")!==!1&&(n.parent().parent().nanoScroller({destroy:!0}),n.parent(".nano-content").replaceWith(n),n.parent(".nano").replaceWith(n),n.attr("style",""))},i._initSortables=function(){e.isFunction(e.fn.sortable)&&e('[data-sortable="true"]').sortable({placeholder:"ui-state-highlight",delay:100,start:function(n,e){e.placeholder.height(e.item.outerHeight()-1)}})},i._initTabs=function(){e.isFunction(e.fn.tab)&&e('[data-toggle="tabs"] a').click(function(n){n.preventDefault(),e(this).tab("show")})},i._initTooltips=function(){e.isFunction(e.fn.tooltip)&&e('[data-toggle="tooltip"]').tooltip({container:"body"})},i._initPopover=function(){e.isFunction(e.fn.popover)&&e('[data-toggle="popover"]').popover({container:"body"})},window.materialadmin.AppVendor=new a}(this.materialadmin,jQuery);