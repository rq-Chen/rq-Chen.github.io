# Ricky
'''
filename: dictionary.py
creating time: 2018.2.2
function: some function and rules about the type "dictionary"
'''

# dictionary自带的方法
a = ('a', 'b', 'c', 'd')
dict1 = {}
dict1 = dict1.fromkeys(a, 0)  # 以seq为键生成值为0的字典
# 注意！fromkeys生成的字典的每一项都是seq所在的地址，因此如果对其中一项进行+=，所有都会改
print (dict1['a'] is dict1['b'])
print ()
print (dict1)
dict1.setdefault('e', 1)  # 返回'e'对应值，否则添加键值对e和1
print (dict1.get('e', "Sorry, can't find it."))  # 返回'e'对应值，否则返回default
for i, j in dict1.items():
    print (i, j, sep = '\t')  # items()方法可用于遍历，同时获取键和值
dict1.update({'f': 3})  # 添加字典到dict1中
print (dict1)
print (dict1.pop('f', 'none'))  # 删除f对应的键值对并返回其值，否则返回none
print (dict1)




    
