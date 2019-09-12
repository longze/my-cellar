# 算法题收集

## 倒水题

**题目:** 给你一个装满水的 8 升满壶和两个分别是 5 升、3 升的空壶，请想个优雅的办法，使得其中一个水壶恰好装 4 升水，每一步的操作只能是倒空或倒满。

理解了这个题目的意思之后，我们的第一个方法肯定就是使用强大的脑力来进行暴力破解法，瓶子里的水在我们的脑子里颠三倒四，但是脑子有可能没那么清晰，想了几步之后就开始出现记忆错乱，然后就不得不开始慢慢重播。 甚至到最后好不容易搞定了，但是怎么走过来的步骤又给忘记的一干二净 —— 智商好像受到了点小小的侮辱！

这道题其实有一道非常科学的解决方法 —— 广度遍历，我们将三个瓶子的状态标示为一个数。

- 8 0 0

然后开始拓展这个数的所有可能的状态，第一步这个数可以变为(壶的顺序固定方便描述，“->” 之前的部分表示前一个状态，“->” 之后的部分表示可以拓展出的状态):

- 8 0 0 -> 3 5 0, 5 0 3

第二步，这里有一个技巧，需要排除前面出现的状态(算法中常用的剪枝技巧):

- 3 5 0 -> 0 5 3, 3 2 3
- 5 0 3 -> 5 3 0

第三步，没有出现爆炸式增长，基本可控

- 0 5 3 -> 无
- 3 2 3 -> 6 2 0
- 5 3 0 -> 2 3 3

第四步，还没出现是不是有点着急了

- 6 2 0 -> 6 0 2
- 2 3 3 -> 2 5 1

第五步，

- 6 0 2 -> 1 5 2
- 2 5 1 -> 7 0 1

第六步，终于出现了 4，这就是循环终止条件了。

- 1 5 2 -> 1 4 3
- 7 0 1 -> 7 1 0

最后把通路单独拿出来，

8 0 0 -> 3 5 0 -> 3 2 3 -> 6 2 0 -> 6 0 2 -> 1 5 2 -> 1 4 3

思考，深度优先可以吗，效率如何？