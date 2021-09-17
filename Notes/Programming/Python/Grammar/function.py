# Ricky
''' 
filename: function.py
creating date: 2018.2.5
function: 认识函数
'''

def fibo(a, b = 1):  # 这里b=1是设定默认值（也可以不设），要写在最后
    "此处a是一个list, b是一个int，函数要返回一个兔子数列的list"
    a = a + [a[-1] + b]  # 此处进行赋值时相当于抛弃原地址重新定义a(变为了局部变量）
    if b > 50:
        return a
    else: return fibo(a, a[-2])
list1 = [1, 1]
print (fibo(a = list1))  # 使用关键字参数可以不按顺序，还可以直接用默认值
print (list1)  # list1没有变
del list1

def def1(list1, dict1):
    list1.append('hello')  # append没有使用赋值号("定义号")而是直接修改值
    dict1['2'] = 'sdh'  # dict在新建字典项时也是直接改值的
    print (list1, dict1)
    return
list1 = [0, 1]
dict1 = {}
dict1['1'] = 'abnc'
def1(list1, dict1)
print (list1, dict1)  # 此时list1, dict1已改变
del list1, dict1

'''
“传值”与“传址”确切地说应该是传“不可变对象”或者“可变对象”
本质都是指针，只是指向的内容是否可变而已：number, tuple, string不可变
'''

def printall(a, *vartuple):  # 带*的变量可以以tuple形式接收传入的不定长参数
    "打印传入的一切东西"
    for var in vartuple:
        print (var, end = ' ')
    print ()
    return
printall("这是a", [2, 'abx'], "sdicb")

'''
变量作用域：L->E->G->B，分别为内层局部、外层函数内、全局、内建（如常数）
module, class, def会引入新的作用域，其他不会
'''

def test1():
    global num  # 声明为全局变量
    num = 10
    test1num = 0
    
    def test2():  # 函数可以嵌套
        nonlocal test1num  # 声明为上一级嵌套的变量
        test1num = 10
        return
    
    test2()
    print (test1num)  # 通过test2修改了test1中的变量值
    return

num = 1
test1()
print (num)  # 通过test1修改了全局变量值
del num




