# PTInfoHelper
用于生成、预览与保存PT站发种页的BBCode，支持PTGen，适用于同一个种子多站转发，配合[auto_feed](https://github.com/tomorrow505/auto_feed_js)食用更佳

<a href="https://imgbox.com/5dgpx3Y9" target="_blank"><img src="https://images2.imgbox.com/7c/59/5dgpx3Y9_o.png" alt="image host"/></a>

### 主要功能

- PTGen获取影片信息（api来自iYuu）
- 保存BBCode至本地
- 预览BBCode（仅支持[img]与[quote]）

### TODO

- 文章结构顺序交换
- 标题识别
- 更合理的字符串匹配

### 碎碎念

- 做这个的原因是经常在转种的时候发现源站种子页缺东西或者图挂了，而且相同的种子在不同的站点种子页内容还不一样。与其去记去从什么地方转，倒不如做一个工具来规整地保存每一份种子的**完整**发布页，这样在发布的时候无论从哪转，直接从文件夹找对应的BBCode然后CV一下就好了，格式采用大多数站点通用的顺序，即*说明-海报-简介-Info-截图*，后续看啥时候有空了再来做一下内容排序
- 感谢文心一言的大力支持XD
