# Ricky
''' 
filename: datatype.py
creating date: 2018.1.25
function: just for testing
'''
# Python中单双引号的作用完全相同

print ("Hello World!")  # 默认换行输出
print ("Hello",' ',sep = '', end = "")  # 不换行输出要加end=""，改分隔符用sep=''
print ("World")

if 2 > 1:
    print \
          ("Yes, 2 > 1")  # 反斜杠可以实现一条语句写多行，分号可以一行写多条
    print ("OK")
else:
    print ("No, 2 < 1")
    input ("\n\nPlease press enter:")  # 等待用户输入

# Python中的变量没有类型，只有其存储的数据有类型，因此一个变量可以存不同类型的数据
# 基本数据类型：Number, String, Tuple（元组）, List, Set, Dictionary
# string, tuple, list合称sequence（有序序列）
# 数据类型强转可以用 int(), set(), tuple(), list(), str()等
# 无需声明类型但必须赋初值

# Number includes int, float, bool, Complex
aInt, bFloat, cBool = 1, 1.2, False  # 可以同时多组赋值，从右边那组开始赋值
d = 4 + 3j; d = complex(4.2, 3.1)  # 复数两种写法
print (d)
d = True  # 一个变量可以存不同类型的数据
d = 1 / 2  # 用/代表除法，用//代表整除，用**代表乘方，用%取余
print (d, type(d))  # 可用type函数查询当前存储的数据类型
d = 1 // 2
print (d)
d = 2 ** 5
print (d)
del aInt, bFloat, cBool, d  # 用完可以释放变量

# Python中的字符串是常量，不可改变（但可以重新给变量赋值）
str1 = '1234567890'
print (str1[-2])  # 输出倒数第二位
print (str1[0: 5])  # 冒号前面是开始位置，后面是结束位置的后一位
print (str1[: -1])  # 一直输出到倒数第二位（-1即倒数第一）
print (str1 * 2, str1 + "Test")  # 重复输出和字符串拼接
print (r"\n")  # 加r可以忽略转义字符
print ('''this is
a long
paragraph''')
print (100,
       200)  # 可以用三个引号来输出多行，也可以用括号
del str1

# List类似数组或结构，元素可变，可嵌套
list1 = [10, "string", True, [3, 'yes']]
print (list1[0:-1])  # 返回一个list，类似字符串（重复、拼接等同理）
# 输出结果是 [10, 'string', True]
print (list1[-1][-1])  # list可以嵌套
list1[0] = 'a'  # 元素可变
list1[0: -1] = []  # 删除前三个元素
print (list1)
del list1

# Tuple类似List，只是元素不可变（元素指向地址不变，但元素内部可以变），用圆括号
list2 = [1]
tuple1 = (1, )  # 一个元素的tuple必须加逗号
tuple1 = (0, list2)
print (tuple1)
list2[0] = 2
print (tuple1)  # list2作为元素其内部可以变（但不能改地址，比如list2 = 'a'）
del tuple1,list2

# Set可以进行集合运算，可以自动去重和进行成员关系测试
a = (100,"test")
set1 = set(a); set1 = {"Tom","Tom","Jerry"};  # 注意创建空集只能用前一种
print (set1)  # 自动去重
print ("Tom" in set1)  # 成员关系测试
a = {"Jerry", "Lin"}
print (a ^ set1)  # 并集|，交集&，差集-，并集减交集^
del set1, a

# Dictionary可以创造无序的键值对集合
dict1 = {}  # 空字典
dict1["one"] = "1. abcd"  # “键”对“值”
dict1[2] = "2. dcba"
print (dict1)
# 第二种定义方法
dict1 = {"one": "1. abcd", 2: "2. dcba"}
print (dict1.keys())
print (dict1.values())
del dict1


