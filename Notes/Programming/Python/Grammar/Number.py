# Ricky
'''
filename: number.py
creating time: 2018.1.31
function: some function and rules about the type "Number"
'''

import math  # 各种数学函数

a = 0xA0F
print (a)  # 0x代表十六进制，0o代表八进制，但会自动都转成十进制
print (oct(a), hex(a))  # 可以用oct和hex输出八进制和十六进制

# 常用数学函数如abs, fabs, ceil和floor（上下取整）, round（比较奇怪的四舍五入）
# exp, log(N, base), max(a1,a2...), sqrt
# sim, atan, hypot(x, y)（向量长度）, pi, e
# ASCII码转字符：chr()，反之为ord()
print (math.floor(3.1))

import random  # 随机函数
# randint(min, max), random()（0-1实数）, uniform(x, y)（x-y实数）
# shuffle(list1)将list1随机排序, choice(seq)从seq中随机挑一个元素
print (random.choice("abcdefg"))
print (random.choice((1,2,3,4)))
a = [1, 2, 3, 4]
random.shuffle(a)  # shuffle的返回值是None
print (a)
print (random.uniform(3, 4))
