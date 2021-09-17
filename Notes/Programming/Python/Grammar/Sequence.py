# Ricky
'''
filename: Sequence.py
creating time: 2018.1.31
function: some function and rules about the type "String", "list" and "tuple"
'''

# 输入输出
print ("我喜欢%s，你应该也知道%d" % ("你", 666))
print ("%.2f" % (3.445))  # 类似sprintf，注意%前没有逗号

# 字符串函数
# len长度，str2.count(str, begin, end)返回str在str2中出现次数
# str2.isdigit判断str2是否只含数字
str2 = "abcdefgh"
print (str2.find("def", 1, len(str2)))  # find返回查到的首字符位置，没有返回-1
sep1 = '_'
seq = ['Hello','world']
print (sep1.join(seq))  # join以sep1为分隔符将seq连成字符串，逆操作是split(sep1)
print ("aaaa".ljust(10, '%'))  # ljust左对齐并用fillchar补充至所需长度
print ("aaa".center(10, '%'))  # center居中并用fillchar补充至所需长度
print ("Hello word".replace("word", "World", 1))  # 最后数字指示最多换多少次
print ("abc%%%".rstrip('%'))  # 截掉右端指定字符（不指定则为空格）
print ("hELLO 11 wORLD".title())  # 首字母大写其他字母小写（标题化）
strtemp = "01人生如梦"
print (strtemp[0: 4])  # 中文也是按字数来(因为使用了UTF-8编码）

# list内部元素的更改
list1 = [1, 2, 3, 4]
del list1[0]
print (list1)
for x in list1:
    print (x, end = '')  # for迭代语句
list1 = [1] + list1  # 支持拼接
print (list1)
list2 = list1
print (id(list1) == id(list2))  # 两个列表指向同一地址（只是变量名不同而已）
list2 = list1[: ]
print (id(list1) == id(list2))  # 截取后返回新列表，地址不同
del list1, list2

# list函数和方法
# 函数（不改变原列表）min, max, len, sorted, reversed
# 方法count, index（类似find）, clear()清空, reverse()反向
list1 = [1, 2, 3, 4, 3]
list1.insert(1, 1.5)  # insert(index, obj)将obj插到index位
list1.extend([0, 1])  # extend把L添加到list1后
print (list1)
list1.remove(3)  # 把找到的第一个obj元素删掉，找不到则报错
print (list1)
print (list1.pop(0))  # 删掉位置为i的元素（不指定则为最后一个元素）并返回值
list1.sort()  # 排序（可指定参数）
print (list1)

# 用旧列表的元素生成新列表（集合和字典也可，tuple不可（会被解析成生成器））
list1 = ["   sidub ", "dd  ", "sd "]
list2 = [str1.strip() for str1 in list1  # 以list1中字符串去掉空格生成新列表
         if len(str1) < 5]  # 可以用if筛选
print (list2)
matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
print ([[row[i] for row in matrix] for i in range(4)])  # 矩阵转置
del matrix

# 遍历list的技巧
for index, num in enumerate(list1):  # 使用enumerate同时获取位置和值
    print (index, num)
del index, num
for i, j in zip(list1, list2):  # 使用zip同时遍历多个列表
    print (i, j)
del j
for i in sorted(list2):  # 使用sorted或reversed来实现顺序、反向遍历
    print (i, end = ' ')

# tuple类似list，但不能更改值



    
