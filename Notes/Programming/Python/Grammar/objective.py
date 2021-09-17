# Ricky
'''
name: objective.py
creating time: 2018.2.19
function: the usage of class
'''
import math

class comp:  # 可以加括号标明继承的父类
    # 如果有多个父类时，若调用他们中名字相同的方法，则按括号中父类的顺序来查找第一个方法
    rPart = 0  # 定义该类对象共有的基本属性
    iPart = 0
    model = 0
    __angle = 0  # 以__开头的变量为私有属性，无法从外部访问（方法也是）
    
    # 可以定义自己的方法或者改写原有的方法，但每个方法都要以额外的参数self开头
    
    def __init__(self, r, i):  # 该方法用于初始化，另外有__del__方法用于清除
        self.rPart = r
        self.iPart = i
        self.model = math.sqrt(r**2 + i**2)
        if self.model == 0:
            self.__angle = 0
        else:
            self.__angle = math.asin(i / self.model)
        return
    
    def __add__(self, other):  # 重写默认的加法
        return comp(self.rPart + other.rPart, self.iPart + other.iPart)
    def __mul__(self, other):
        tempR = self.rPart * other.rPart - self.iPart * other.iPart
        tempI = self.iPart * other.rPart + self.rPart * other.iPart
        return comp(tempR, tempI)
    def __sub__(self, other):
        return comp(self.rPart - other.rPart, self.iPart - other.iPart)
    def __truediv__(self, other):  # 注意python3中不是div了
        if other.model == 0: return comp(0, 0)
        tempA = self.__angle - other.__angle
        tempM = self.model / other.model
        tempR = tempM * math.cos(tempA)
        tempI = tempM * math.sin(tempA)
        return comp(tempR, tempI)
    def __repr__(self):  # 类似str，用于print输出（即如何转换为字符串）
        return repr(self.rPart) + ' + ' + repr(self.iPart) + 'i'
    # 还可以重写cmp, len, mod, pow
    # setitem（按索引（即下标）赋值）,getitem（按索引取值）
    def gongE(self): # 求共轭
        return comp(self.rPart, 0 - self.iPart)

# 以下把这个类实例化并做一些测试
a = comp(1.2, 2.5)
print ('a =', a, '实部:', a.rPart, '虚部:', a.iPart)
b = comp(1, 3)
print ('b的模为：', b.model)
print ('b的共轭为:', b.gongE())  # 若不重载str或repr，则只会打印地址
print ('a + b =', a + b)
print ('a * b =', a * b)
print ('a / b =', a / b)
print ('a / b * b =', a / b * b)
print ('a - b =', a - b)









        
