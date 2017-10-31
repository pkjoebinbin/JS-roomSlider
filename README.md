# JS-roomSlider
原生JS撸的轮播图插件

----------
原生JS练手手写了个轻量级的轮播图插件，无第三方依赖，开箱即用，没有过多的繁杂配置。


**1.引入JS**

    <script src="roomSlider.js"></script>

**2.初始化结构。外层div需给定id以及设置宽高，img图片需给定宽高**。

    
    <style>
        #slide{
            width:520px;
            height:280px;
        }
        
        img{
            width:520px;
            height:280px;
        }
    </style>
    
    <div id="slide" style="width:520px;height:280px;">
        <div>
            <img src="1.jpg" alt="">
            <img src="2.jpg" alt="">
            <img src="3.jpg" alt="">
            <img src="4.jpg" alt="">
            <img src="5.jpg" alt="">
        </div>
    </div>

**3.JS传入ID。**


    var roomSlider = new RoomSlider('slide')
    