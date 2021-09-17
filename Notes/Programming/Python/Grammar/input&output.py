# Ricky
''' 
filename: input&output.py
creating date: 2018.2.17
function: 输入输出
'''
# 格式化输出
print ('{1: 6.3f} plus {0: 6d} {2}:'.format(223, 23.23423, 'equals'))
# 冒号前用于指示format中第几个元素，冒号后类似printf(int型的d可以不写)
print ('{0} means {name}'.format(10, name = 'dfs'))  # 关键字参数（必须放最后）
dict1 = {'sda': 12, 2123: 'fsd'}
print ('sda means: {0[sda]}\n2123 means: {0[2123]}'.format(dict1))
del dict1

print ('%08.3f' % (3.14159))  # 可以使用旧方法但不建议

# 读入
str1 = input('input a string:')
if str1.isdigit():
    num = int(str1)
    print (num + 1)
else:
    print (str1)

# 文件操作（类似C++)
f = open('test.txt', 'w+')
# 可以使用with open(...) as f:这一语句来保证执行后正确关闭文件
# r, w, a分别是in, out和add，若加上b则为二进制，加上+则既可读又可写
print (f.write(str(33423)))  # 必须为str类型，会返回所写的字符数
f.close()
f = open('test.txt', 'r')
print (f.readline())
f.close()
del f

# pickle可用于保存一个对象到文件或者从文件中重构这个对象
import pickle
data1 = [{'name': '小明', 'score': 95}, {'name': '小芳', 'score': 90}]
f = open('test.txt', 'wb')
pickle.dump(data1, f)  # 默认使用二进制，输入输出要加b
f.close()
f = open('test.txt','rb')
data2 = pickle.load(f)
print (data2)
f.close()







