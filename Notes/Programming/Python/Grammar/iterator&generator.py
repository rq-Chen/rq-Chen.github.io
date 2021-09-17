# Ricky
'''
filename: iterator&generator.py
creating time: 2018.2.5
function: 迭代器和生成器的使用方法
'''

# 迭代器用于访问集合中的元素
list1 = [1, 2, 3]
it1 = iter(list1)
dict1 = {123: "try", 'a': 100}
it2 = iter(dict1)  # 键的迭代器
while True:
    try:  # try语句表示正常情况
        print (next(it1), next(it2))
    except:  # 如果try中出错（比如next不下去）就执行except（并可以指定某类型的错误）
        break
    else:  # else会在try完全正确执行之后执行
        pass
    finally:  # finally无论如何都会执行
        pass

# 生成器是一个返回迭代器的函数，可用于节省内存
def def1(a, b):
    while a + b < 50:
        yield a + b  # 运行到此处时停止并返回a+b, next时再从这里开始运行
        a, b = a + b, a

f1 = def1(0, 1)  # f就是一个生成器

while True:
    try:
        print (next(f1))
    except:
        break
# 或者也可以使用for
for n in def1(0, 1):  # 当实际传参后def1即可作为迭代器使用
    print (n)

    
