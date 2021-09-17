# Ricky
''' 
filename: whileforif.py
creating date: 2018.2.2
function: 认识各种常用语句
'''

while True:
    n = input("循环次数为：")
    if n.isdigit():
        n = int(n)  # 要把str格式转换成int
        break  # break和continue与c中一样
    else: print ("请输入数字!")
    
print (list(range(0, 2 * n - 2, 2)))  # range也是一种seq，格式为(begin,end,step)
for i in range(n):  # 默认从0开始，步长为1
    a, b = 0, 1
    while b < 40:  # 没有do while语句
        print (b, end = ',')
        if (b % 2):  # 没有switch case语句
            print ('\b')  # windows下退格无法打印
        elif (b == 21):  # 用elif代替了else if
            break
        else: pass  # pass是空语句
        a, b = b, a + b  # b先赋值（另：python中没有a++）
    else: print ("21是斐波那契数")  # while后的else在循环结束（不是跳出）时执行
else: print ("打印完毕")  # for的else在循环正常结束（未跳出）时执行    
