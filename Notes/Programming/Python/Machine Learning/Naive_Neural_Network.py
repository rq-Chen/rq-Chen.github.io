import math

def createDataSet():
    """
    创建测试的数据集，里面的数值中具有连续值
    :return:
    """
    dataSet = [
        # 1
        [1, 0, 1, 0, 0, 0, 0.697, 0.460, 1],
        # 2
        [2, 0, 2, 0, 0, 0, 0.774, 0.376, 1],
        # 3
        [2, 0, 1, 0, 0, 0, 0.634, 0.264, 1],
        # 4
        [1, 0, 2, 0, 0, 0, 0.608, 0.318, 1],
        # 5
        [0, 0, 1, 0, 0, 0, 0.556, 0.215, 1],
        # 6
        [1, 1, 1, 0, 1, 1, 0.403, 0.237, 1],
        # 7
        [2, 1, 1, 1, 1, 1, 0.481, 0.149, 1],
        # 8
        [2, 1, 1, 0, 1, 0, 0.437, 0.211, 1],

        # ----------------------------------------------------
        # 9
        [2, 1, 2, 1, 1, 0, 0.666, 0.091, 0],
        # 10
        [1, 2, 0, 0, 2, 1, 0.243, 0.267, 0],
        # 11
        [0, 2, 0, 2, 2, 0, 0.245, 0.057, 0],
        # 12
        [0, 0, 1, 2, 2, 1, 0.343, 0.099, 0],
        # 13
        [1, 1, 1, 1, 0, 0, 0.639, 0.161, 0],
        # 14
        [0, 1, 2, 1, 0, 0, 0.657, 0.198, 0],
        # 15
        [2, 1, 1, 0, 1, 1, 0.360, 0.370, 0],
        # 16
        [0, 0, 1, 2, 2, 0, 0.593, 0.042, 0],
        # 17
        [1, 0, 2, 1, 1, 0, 0.719, 0.103, 0]
    ]

    # 特征值列表
    labels = ['色泽', '根蒂', '敲击', '纹理', '脐部', '触感', '密度', '含糖率']

    # 浅白到乌黑0-2，蜷缩到硬挺0-2，清脆到沉闷0-2，清晰到模糊0-2，凹陷到平坦0-2，硬滑0软粘1，坏瓜0好瓜1

    # 特征对应的所有可能的情况
    labels_full = {}

    for i in range(len(labels)):
        labelList = [example[i] for example in dataSet]
        uniqueLabel = set(labelList)
        labels_full[labels[i]] = uniqueLabel

    return dataSet


dataSet = createDataSet()

# define a 8-3-1 nureal network (bottom-up)
outputThre, hiddenThre = 0.9, [0.6, 0.3, 0.7]  # the threshold of the output layer and the hidden layer
weightHO = [1, 2, 3]  # the connection weight between the hidden layer and output layer
weightIH = [[1, 3, 2] for j in range(8)]  # between the input and hidden layer

learningRate = 0.1
totalError = []
countRound = 0


def OneEpoch(nRenewRate):
    global outputThre, hiddenThre, weightHO, weightIH, learningRate, countRound
    def Sigmoid(x):
        return 1 / (1 + math.exp(0 - x))  # with x = nIn - nThre

    dError, deltaOutThre, deltaHidThre = 0, 0, [0, 0, 0]  # delta means the change
    deltaHO, deltaIH = [0 for i in range(3)], [[0 for i in range(3)] for j in range(8)]
    
    for exam in dataSet:
        currdeltaOutThre, currdeltaHidThre = 0, [0, 0, 0]
        currdeltaHO, currdeltaIH = [0, 0, 0], [[0, 0, 0] for j in range(8)]
        iOutput = exam[: -1]
        hInput, hOutput = [0 - i for i in hiddenThre], [0, 0, 0]
        oInput = 0 - outputThre
        for i in range(3):
            for j in range(8):
                hInput[i] += weightIH[j][i] * iOutput[j]
            hOutput[i] = Sigmoid(hInput[i])
            oInput += weightHO[i] * hOutput[i]
        oOutput = Sigmoid(oInput)
        countRound += 1
        currError = round(0.5 * ((exam[-1] - oOutput) ** 2), 5)
        dError += currError

        gradOut = 0  # the partial derivative of the error func over outputThre
        gradHid = [0, 0, 0]  # over hiddenThre
        gradOut = oOutput * (1 - oOutput) * (exam[-1] - oOutput)
        currdeltaOutThre -= learningRate * gradOut
        for i in range(3):
            gradHid[i] = hOutput[i] * (1 - hOutput[i]) * gradOut * weightHO[i]
            currdeltaHidThre[i] -= learningRate * gradHid[i]
            currdeltaHO[i] -= hOutput[i] * currdeltaOutThre
            for j in range(8): currdeltaIH[j][i] -= iOutput[j] * currdeltaHidThre[i]
        deltaOutThre += currdeltaOutThre
        for i in range(3):
            deltaHidThre[i] += currdeltaHidThre[i]
            deltaHO[i] += currdeltaHO[i]
            for j in range(8): deltaIH[j][i] += currdeltaIH[j][i]
        
        if countRound % nRenewRate == nRenewRate - 1 or countRound % 17 == 16:
            outputThre += deltaOutThre
            for i in range(3):
                hiddenThre[i] += deltaHidThre[i]
                weightHO[i] += deltaHO[i]
                for j in range(8): weightIH[j][i] += deltaIH[j][i]
            # print(countRound // nRenewRate, 'outputThre:', outputThre, '  hiddenThre:', hiddenThre)
            deltaOutThre, deltaHidThre = 0, [0, 0, 0]
            deltaHO, deltaIH = [0, 0, 0], [[0, 0, 0] for i in range(8)]

    print('Epoch', str(1 + countRound // 17) + ' ', 'total error of this epoch:', dError)
    return round(dError, 6)

for i in range(100):
    totalError.append(OneEpoch(17))
    if len(totalError) > 5:
        if max(totalError[-5:]) - min(totalError[-5:]) < 0.0002: break
        totalError = totalError[-5:]
