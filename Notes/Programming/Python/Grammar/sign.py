# Ricky
''' 
filename: sign.py
creating date: 2018.1.25
function: 认识各种运算符
'''

# 算术运算符、赋值运算符、比较运算符、位运算符与C完全相同
# 但整除是//，普通除法是/，幂运算是**

# 逻辑运算符and, or, not分别为与或非
if not (0 and 1):
    print ("haha")

# 成员运算符in和not in
a = (3, 4, 5)
if 3 not in a or 5 in a:
    print ("hahaha")
del a

# 身份运算符is和is not用于判断内存地址是否相同
a = [3, 4, 5]
b = a  # 此时两个变量指向的地址一致
print (b is a)
b = a[: ]  # 此时b的意义改变了（截取a的一部分（虽然此处是全部）返回一个新list）
print (b is a)  # 改变其中一个变量后两个变量指向的地址就不一致了
print (b == a)  # 但他们的值可以一样
