# 素材

## 一

你可能听说过 “0.5px 边框画法”这种技术，那如果在 dpr 为 3 的屏幕上还应该有 “0.33px 边框画法”，实际上就是“一物理像素边框画法”，这里不展开给个链接自己看吧: [https://fed.renren.com/2018/03/24/half-of-one-px/](https://fed.renren.com/2018/03/24/half-of-one-px/)
。

data-dpr: https://www.jianshu.com/p/1a9b5d48afa2

data-dpr 实现方案: https://www.jianshu.com/p/3a07024963d9

## 1080 的来历


原因大体是这样，iPhone4 到 iPhone6 的 ppi 是一致的都是 326，用 @x2 的素材，iPhone6 Plus 到 iPhone8 Pluse 的 ppi 是 401(iPhoneX 的 ppi 是 458)，理论上苹果应该用401/326 x @2x = @2.46x的素材，也就是如果有一个 10px 的图标，那么双倍屏应该用 20px 的图标，而三倍屏要用 10x2.46px 大小的图标，注意我这里说的是图标的尺寸也就是原始图片的大小，但是设计的时候如果出不同分辨率的图的话，三倍屏还是会出 1242 的图，为什么呢？如果你出个 1080 的图，比如有这样一个设计：主体宽度 1000 两边间距各 40，那么在 iPhone6 Plus 上会出现生么效果呢？右边会多出一些空白，空白的尺寸会是 1242 - 1080。总结一下，出不同倍图标的时候 1080 是一个理论数字，其实也用不到这个数字，不同倍率的图标在尺寸上等差，设计整个页面和编写整个页面的时候还是要以 1242 宽作为标准。

上面的解释基本够用了，我想补充一下不同倍率图标是怎么展示的，我们再以上面 10px 的图标为例，那么二倍屏就是 20px，苹果用系统能力提供了 3 倍屏的方案，也就是从 30px 到 10x2.46px 的计算是体统提供的图像缩放算法。需要注意的是这个缩放算法只对图片有效，文字和布局上的尺寸设置的多少渲染的就是多少。

再回到当前(2018年)，写这篇文章的时候我想找一部 5s 验证一些我的想法，找了一圈没有，连公司的测试团队都没有这个机型了，最后从一个同事那里找到了他换下来的 6，现在 UE 出图已经不会出 3 套图了，只出一套 6 Plus 的图，