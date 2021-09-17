# Ricky
''' 
filename: import.py
creating date: 2018.2.17
function: 认识模块
'''

# 可以直接导入整个模块，并会执行其中的可执行代码一次
import function  # 要导入的模块可放在相同目录或python库目录（可用sys.path查看）中
print (function.fibo([1]))

'''
# 也可以使用下面这种方法
from function import fibo  # function中可执行的代码会执行一次，但def中只会导入fibo
print ('\n',fibo([1, 1]))
'''

# 两种方法的区别：前者会把function变成符号表中的一个关键字，而后者不会定义function
print (function.__name__)  # 每个模块都有__name__属性
print (__name__)
# 若模块自身被运行则该属性的值为__main__，可用于判断，使模块被导入时不执行其中的某些语句
